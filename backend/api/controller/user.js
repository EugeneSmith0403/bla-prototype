const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const secretAppKey = process.env.secretAppKey


const userAuth = (request, userData, resultRequest) => {
  bcrypt.compare(request.body.password, userData.password, function(err, compareResult) {
      if(err) {
        res.status(401).json({
          "message": 'Autorization Failed'
        })
      }else {
        const opts = {
          expiresIn: '1h'
        }
        const payload = {
          id: userData._id,
          email: userData.email,
          password: userData.password
        }
        const token = jwt.sign(payload, secretAppKey,  opts)
        resultRequest.status(200).json({
          "message": 'Authorization success',
          "token": token,
          "userId": userData._id
        })
      }

  });
}

module.exports.signUp = (req, res, next)=> {
  User.find({email: req.body.email}).then((result)=> {
      if(result.length) {
        userAuth(req, result[0], res)
      }else{
        bcrypt.hash(req.body.password, 10, (err, hash)=> {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            password: hash,
            email: req.body.email
          })
            user.save()
              .then((result)=>{
                if(result) {
                  res.status(201).json({
                    'message': 'User created'
                  })
                }
               })
              .catch((err)=> {
                res.status(500).json({
                  message: err
                })
            })
        });
      }
  })
}
module.exports.logIn = (req, res, next)=> {
    User.find({email: req.body.email}).then((result)=> {
      if(!result.length) {
          res.status(500).json({
            message: "user doesn't exiest"
          })
      }else {
        userAuth(req, result[0], res);
      }
    })
}

module.exports.updateUser = (req, res, next)=> {
  const id = req.params.userId;
  const updateOpts = {}
  const body = req.body
  for (let prop in body) {
    updateOpts[prop] = body[prop]
  }
  if(req.file && req.file.path) {
    updateOpts['image'] = req.file.path;
  }
    User.update({_id: id}, { $set: updateOpts })
      .then((results)=>{
        res.status(201).json({
          message: 'User updated',
          userId: id,
          results: results,
          type: 'POST'
        })
      })
      .catch((err)=>{
          res.status(500).status({
            message: err
          })
      })
}

module.exports.getAllUser = (req, res, next)=> {

  User.find().populate('trips').exec()
    .then((result)=>{
        res.status(200).json({
          message: result
        })
    })
    .catch((err)=>{
      res.status(500).json({
        message: err
      })
    })
}

module.exports.deleteUser = (req, res, next) => {
    const id = req.params.userId
    User.remove({_id: id})
      .then((result)=> {
        res.status(200).json({
          message: 'User deleted',
          userId: id,
          results: result,
          type: 'DELETE'
        })
      })
      .catch((err)=>{
        res.status(500).json({
          message: err
        })
      })
}
