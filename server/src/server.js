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
    const verificaUsuarioQuery = 'SELECT * FROM users WHERE user_name = ?'
    const results = await db.query(verificaUsuarioQuery, [userName])

    if (results.length > 0) {
      res.status(409).json({ error: 'Nome de usuário já existe' })
      return
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10)

    const signupUserQuery =
      'INSERT INTO users (user_name, user_nick, user_password) VALUES (?, ?)'
    await db.query(signupUserQuery, [userName, userNick, hashedPassword])

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error)
    res.status(500).json({ error: 'Erro ao cadastrar usuário' })
  }
})

app.post('/signin', async (req, res) => {
  const { userName, userPassword } = req.body

  try {
    const buscaUsuarioQuery = 'SELECT * FROM users WHERE user_name = ?'
    const results = await db.query(buscaUsuarioQuery, [userName])

    if (results.length === 0) {
      res.status(401).json({ error: 'Nome de usuário ou senha incorretos' })
      return
    }

    const usuario = results[0]

    const senhaCorrespondente = await bcrypt.compare(
      userPassword,
      usuario.user_password
    )

    if (!senhaCorrespondente) {
      res.status(401).json({ error: 'Nome de usuário ou senha incorretos' })
      return
    }

    res
      .status(200)
      .json({ message: 'Login bem-sucedido', user_id: usuario.user_id })
  } catch (error) {
    console.log('Erro ao verificar credenciais:', error)
    res.status(500).json({ error: 'Erro ao verificar credenciais' })
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
