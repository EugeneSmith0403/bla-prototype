const User = require('../api/models/user')
const jwt = require('jsonwebtoken')
const secretKey = process.env.secretAppKey
module.exports = (req, res, next) => {
  const id = req.params.userId
  const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, secretKey, (err, decode)=> {
      const idDecoded = decode.id
      if(id !== idDecoded) {
        res.status(403).json({
          "message": 'Permission denied'
        })
      }else {
        next()
      }
  })
}
