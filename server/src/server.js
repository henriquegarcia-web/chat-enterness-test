require('dotenv').config()

const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server)

const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const moment = require('moment')

const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat_enterness_test'
})

db.connect((err) => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados MySQL:', err)
    throw err
  }
  console.log('Conectado ao banco de dados MySQL')
})

app.get('/salas', (req, res) => {
  const query = 'SELECT * FROM Salas'
  db.query(query, (err, results) => {
    if (err) {
      console.log('Erro ao buscar as salas:', err)
      res.status(500).json({ error: 'Erro ao buscar as salas' })
      return
    }
    res.json(results)
  })
})

io.on('connection', (socket) => {
  console.log('Novo usuário conectado')

  socket.on('enviarMensagem', (data) => {
    const { salaID, userID, mensagem } = data
    const timestamp = new Date().toISOString()
    const query =
      'INSERT INTO Mensagens (conteudo, remetente, sala, timestamp) VALUES (?, ?, ?, ?)'
    db.query(query, [mensagem, userID, salaID, timestamp], (err, result) => {
      if (err) {
        console.log('Erro ao enviar mensagem:', err)
        return
      }
      io.emit('novaMensagem', {
        mensagemID: result.insertId,
        conteudo: mensagem,
        remetente: userID,
        sala: salaID,
        timestamp: timestamp
      })
    })
  })

  socket.on('disconnect', () => {
    console.log('Usuário desconectado')
  })
})

app.post('/signup', async (req, res) => {
  const { userName, userNick, userPassword } = req.body

  try {
    db.query(
      'SELECT * FROM users WHERE user_nick = ?',
      [userNick],
      (err, result) => {
        if (err) {
          res.send(err)
        }
        if (result.length == 0) {
          bcrypt.hash(userPassword, saltRounds, (err, hash) => {
            db.query(
              'INSERT INTO users (user_name, user_nick, user_password) VALUE (?,?,?)',
              [userName, userNick, hash],
              (error, response) => {
                if (err) {
                  res.send(err)
                }

                res.status(200).send({
                  success: true,
                  msg: 'Usuário cadastrado com sucesso'
                })
              }
            )
          })
        } else {
          res.status(400).send({ error: 'Usuário já cadastrado' })
        }
      }
    )
  } catch (err) {
    res.status(500).send({ error: 'Erro interno no servidor' })
  }
})

app.post('/signin', async (req, res) => {
  const { userNick, userPassword } = req.body

  try {
    const user = await db.query('SELECT * FROM users WHERE user_nick = ?', [
      userNick
    ])

    if (user.length === 0) {
      res.status(401).send({ error: 'Usuário não registrado' })
      return
    }

    bcrypt.compare(userPassword, user[0].user_password, (error, response) => {
      if (error) {
        res.status(500).send({ error: 'Erro interno no servidor' })
        return
      }
      if (response) {
        res.status(200).send({ success: true, msg: 'Usuário logado' })
      } else {
        res.status(404).send({ error: 'Senha incorreta' })
      }
    })
  } catch (err) {
    res.status(500).send({ error: 'Erro interno no servidor' })
  }
})

app.get('/rooms', (req, res) => {
  res.json(activeRooms)
})

const PORT = process.env.SERVER_PORT || 5000

app.listen(PORT, () => {
  console.log('Server running on the port:', PORT)
})

// app.get('/teste', async (req, res) => {
//   res.send('Teste')
// })
