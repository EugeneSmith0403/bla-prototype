const jwt = require('jsonwebtoken')
const secretKey = process.env.secretAppKey;
module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, secretKey, (err, decode)=> {
      if (err) {
        res.status(401).json({
          message: 'wrong way to autorization'
        })
      }else {
        next()
      }
    });
  }catch(e) {
    res.status(500).json({
      "message": "check correct autorization header"
    })
  }

}
