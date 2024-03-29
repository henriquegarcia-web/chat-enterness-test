// Carrega variáveis de ambiente
require('dotenv').config()

const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const moment = require('moment')
const { Sequelize, DataTypes } = require('sequelize')

const authenticateToken = require('./authMiddleware')
const jwt = require('jsonwebtoken')

// Inicialização do aplicativo Express
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

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
  messageSenderName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  messageRoom: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  messageTimestamp: {
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

// Definição do modelo Room
const Room = sequelize.define('rooms', {
  roomId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdByName: {
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

// Relacionamentos entre modelos
User.hasMany(Room, { foreignKey: 'createdBy' })
Room.belongsTo(User, { foreignKey: 'createdBy' })
Room.hasMany(Message, { foreignKey: 'messageRoom' })
Message.belongsTo(Room, { foreignKey: 'messageRoom' })

// Relacionamentos entre modelos
User.hasMany(Message, { foreignKey: 'messageSender' })
Message.belongsTo(User, { foreignKey: 'messageSender' })

// Middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

// Observador para criação de sala
Room.afterCreate(async (room) => {
  const updatedRooms = await Room.findAll()
  io.emit('updateRooms', updatedRooms)
})

// Observador para exclusão de sala (se necessário)
Room.afterDestroy(async () => {
  const updatedRooms = await Room.findAll()
  io.emit('updateRooms', updatedRooms)
})

// ========================================== ROTAS DE AUTENTICAÇÃO

// Rota de cadastro
app.post('/signup', async (req, res) => {
  const { userName, userNick, userPassword } = req.body

  try {
    const existingUser = await User.findOne({ where: { userNick } })
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já cadastrado' })
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10)
    const newUser = await User.create({
      userName,
      userNick,
      userPassword: hashedPassword
    })

    const token = jwt.sign(
      { userId: newUser.userId, userName, userNick },
      process.env.SECRET_TOKEN_KEY,
      {
        expiresIn: '1h'
      }
    )

    res.status(200).json({
      success: true,
      token: token,
      msg: 'Usuário cadastrado com sucesso'
    })
  } catch (error) {
    console.error('Erro interno no servidor:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

// Rota de login
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

    const token = jwt.sign(
      { userId: user.userId, userName: user.userName, userNick },
      process.env.SECRET_TOKEN_KEY,
      {
        expiresIn: '1h'
      }
    )

    res.status(200).json({ success: true, token: token, msg: 'Usuário logado' })
  } catch (error) {
    console.error('Erro interno no servidor:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

// Rota de validação do token
app.get('/verify-token', authenticateToken, (req, res) => {
  res.json({
    userId: req.user.userId,
    userName: req.user.userName,
    userNick: req.user.userNick
  })
})

// ========================================== ROTAS DO CHAT

// Obtém listagem das salas
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.findAll()
    res.status(200).json(rooms)
  } catch (error) {
    console.error('Erro ao buscar salas:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

// Obtém listagem das mensagens
app.post('/messages', async (req, res) => {
  const { roomId } = req.body

  try {
    const messages = await Message.findAll({
      where: { messageRoom: roomId }
    })
    res.status(200).json(messages)
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

// Rota para exclusão de sala
app.delete('/rooms/:roomId', async (req, res) => {
  const { roomId } = req.params
  const { userId } = req.body

  try {
    const room = await Room.findByPk(roomId)
    if (!room) {
      return res.status(404).json({ error: 'Sala não encontrada' })
    }

    // Verificar se o usuário atual é o criador da sala
    if (room.createdBy !== userId) {
      return res
        .status(403)
        .json({ error: 'Apenas o criador pode excluir a sala' })
    }

    await room.destroy()

    const updatedRooms = await Room.findAll()
    io.emit('updateRooms', updatedRooms)

    res
      .status(200)
      .json({ success: true, message: 'Sala excluída com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir sala:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

// Conexão com o Socket.IO
io.on('connection', (socket) => {
  console.log('Novo usuário conectado')

  // Função de enviar mensagem
  socket.on('sendMessage', async (data) => {
    try {
      const { roomId, userId, message } = data
      const user = await User.findOne({ where: { userNick: userId } })

      const timestamp = moment().toISOString()
      const messageModel = await Message.create({
        messageContent: message,
        messageSender: user.userId,
        messageSenderName: user.userName,
        messageRoom: roomId,
        messageTimestamp: timestamp
      })
      io.to(`room-${roomId}`).emit('newMesssage', messageModel)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    }
  })

  // Função de entrar na sala
  socket.on('entryRoom', (roomId) => {
    socket.join(`room-${roomId}`)
    console.log(`Usuário entrou na sala ${roomId}`)
  })

  // Função de criar sala
  socket.on('createRoom', async (data) => {
    try {
      const { roomName, createdBy } = data
      const user = await User.findOne({ where: { userNick: createdBy } })

      if (!user) {
        console.error('Usuário com userNick', createdBy, 'não encontrado')
        return
      }

      const room = await Room.create({
        roomName,
        createdBy: user.userId,
        createdByName: user.userName
      })
      io.emit('updateRooms', await Room.findAll())
    } catch (error) {
      console.error('Erro ao criar sala:', error)
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
    await sequelize.sync()
    const PORT = process.env.SERVER_PORT || 5000
    server.listen(PORT, () => {
      console.log('Server running on the port:', PORT)
    })
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MySQL:', error)
  }
})()
