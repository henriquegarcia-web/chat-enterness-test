require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const moment = require('moment')

const port = 5000

app.use(express.json())
app.use(bodyParser.json())

app.get('/teste', async (req, res) => {
  res.send('Teste')
})

app.listen(port, () => {
  console.log('Servidor rodando na porta:', port)
})
