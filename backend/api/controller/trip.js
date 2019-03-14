const jwt = require('jsonwebtoken')
const Trip = require('./../models/trip')
const User = require('./../models/user')
const mongoose = require('mongoose')

const secretKey = process.env.secretAppKey


module.exports.getAll = (req, res, next) => {
  Trip.find().select('creator cost').populate('creator passengers').exec()
    .then((results)=> {
      //TODO map the result without password and _id
        res.status(200).json({
          result: results
        })
    })
    .catch((err)=> {
      res.status(500).json({
        message: err
      })
    })
}

module.exports.getById = (req, res, next) => {
  const id  = req.params.tripId
  Trip.findById(id)
    .exec()
    .then((result)=>{
        if(result) {
          res.status(200).json({
            result: result
          })
        }else {
          res.status(404).json({
            message: "Trip doesn't found"
          })
        }
    })
    .catch((err)=>{
      res.status(500).json({
        message: err
      })
    })
}

module.exports.create = (req, res, next) => {
  const body = req.body
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.verify(token, secretKey)
  let tripFields = {
    _id: new mongoose.Types.ObjectId(),
    creator: decode.id
  }
  if(typeof req.body === 'object') {
    for (let key in body) {
        tripFields[key] = body[key]
    }
  }
  const trip = new Trip(tripFields)
  trip.save()
    .then((result)=> {
        User.update({_id: decode.id}, { $push: { trips: result.id } })
          .then((result)=> {
            res.status(201).json({
              message: 'trip created',
              result: result,
              type: 'POST'
            })
          })
          .catch((err)=>{
            res.status(500).json({
              message: err
            })
          })
    })
    .catch((err)=> {
      res.status(500).json({
        message: err
      })
    })
}

module.exports.update = (req, res, next) => {
  const id = req.params.tripId
  const updateFields = {}
  const body = req.body
  if(typeof body === 'object') {
    for (let key in body) {
        updateFields[key] = body[key]
    }
  }
  Trip.update({_id: id}, { $set: updateFields })
    .then((result)=>{
      res.status(201).json({
        message: 'Trip updated',
        userId: id,
        results: result,
        type: 'POST'
      })
    })
    .catch((err)=>{
      res.status(500).json({
        message: err
      })
    })
}

module.exports.delete = (req, res, next) => {
  const id = req.params.tripId
  Trip.remove({_id: id})
    .then((result)=> {
      const token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, secretKey)
      User.update({_id: decode.id}, { $pull: { trips: decode.id } })
        .then((result)=> {
          res.status(200).json({
            message: 'Trip deleted',
            tripId: id,
            results: result,
            type: 'DELETE'
          })
        }).catch((err)=>{
        res.status(500).json({
          message: err
        })
      })


    })
    .catch((err)=>{
      res.status(500).json({
        message: err
      })
    })
}
