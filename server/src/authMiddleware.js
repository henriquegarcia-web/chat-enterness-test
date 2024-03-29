const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (token == null)
    return res.status(401).json({ message: 'Token não fornecido' })

  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' })

    req.user = user
    next()
  })
}

module.exports = authenticateToken
