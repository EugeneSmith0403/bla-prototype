const Trip = require('./../models/trip')
const User = require('./../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const secretKey = process.env.secretAppKey


const getRequestValues = (request) => {
  return {
    tripId: request.body.tripId,
    userId: request.body.userId
  }
}

const updateBooking = (response, tripId, updatedField, action) => {
  Trip.update({ _id: tripId }, updatedField )
    .then((result)=> {
        response.status(201).json({
          message: 'Driver ' + action +'s your trip'
        })
    })
    .catch((err)=>{
      response.status(500).json({
        message: err
      })
    })
}

module.exports.cancel = (req, res, next) => {
  const action = 'cancel'
  const params = getRequestValues(req)

  const updatedField = {
    $pull: { pendingPassengers: { $in: [ params.userId ]}, applyPassengers: { $in: [ params.userId ]} },
    $set: { cancelPassengers: params.userId }
  }

  updateBooking(res, params.tripId, updatedField, action)
}
module.exports.apply = (req, res, next) => {
  const action = 'apply'
  const params = getRequestValues(req)
  const updatedField = {
    $pull: { pendingPassengers: { $in: [ params.userId ]}, cancelPassengers: { $in: [ params.userId ]} },
    $set: { applyPassengers: params.userId }
  }
  updateBooking(res, params.tripId, updatedField, action)
}
module.exports.pending = (req, res, next) => {
  const action = 'pending'
  const params = getRequestValues(req)
  const updatedField = { $set: { pendingPassengers: params.userId }}
  updateBooking(res, params.tripId, updatedField, action)
}
