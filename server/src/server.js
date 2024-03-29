const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const moment = require('moment')
const { Sequelize, DataTypes } = require('sequelize')

// Carrega variáveis de ambiente
require('dotenv').config()

// Inicialização do aplicativo Express
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Configuração do banco de dados Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
)

// Definição do modelo User
const User = sequelize.define('users', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userNick: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userPassword: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
})

// Definição do modelo Message
const Message = sequelize.define('messages', {
  messageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  messageContent: {
    type: DataTypes.STRING,
    allowNull: false
  },
  messageSender: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  messageRoom: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
})

// Relacionamentos entre modelos
User.hasMany(Message, { foreignKey: 'messageSender' })
Message.belongsTo(User, { foreignKey: 'messageSender' })

// Middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

// Rotas
app.get('/rooms', (req, res) => {
  // Implementação das salas ativas
})

app.post('/signup', async (req, res) => {
  const { userName, userNick, userPassword } = req.body

  try {
    const existingUser = await User.findOne({ where: { userNick } })
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já cadastrado' })
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10)
    await User.create({ userName, userNick, userPassword: hashedPassword })

    res
      .status(200)
      .json({ success: true, msg: 'Usuário cadastrado com sucesso' })
  } catch (error) {
    console.error('Erro interno no servidor:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

app.post('/signin', async (req, res) => {
  const { userNick, userPassword } = req.body

  try {
    const user = await User.findOne({ where: { userNick } })
    if (!user) {
      return res.status(401).json({ error: 'Usuário não registrado' })
    }

    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    res.status(200).json({ success: true, msg: 'Usuário logado' })
  } catch (error) {
    console.error('Erro interno no servidor:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

// Socket.IO
io.on('connection', (socket) => {
  console.log('Novo usuário conectado')

  socket.on('enviarMensagem', async (data) => {
    try {
      const { salaID, userID, mensagem } = data
      const timestamp = moment().toISOString()
      await Message.create({
        messageContent: mensagem,
        messageSender: userID,
        messageRoom: salaID,
        timestamp
      })
      io.emit('novaMensagem', {
        conteudo: mensagem,
        remetente: userID,
        sala: salaID,
        timestamp
      })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log('Usuário desconectado')
  })
})

// Sincronização do modelo com o banco de dados e inicialização do servidor
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Conectado ao banco de dados MySQL')
    await sequelize.sync({ alter: true })
    const PORT = process.env.SERVER_PORT || 5000
    server.listen(PORT, () => {
      console.log('Server running on the port:', PORT)
    })
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MySQL:', error)
  }
})()
