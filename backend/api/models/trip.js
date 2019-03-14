const mongoose = require('mongoose')

const tripSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cost: {type: Number},
  car: { type: String },
  applyPassengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  pendingPassengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  cancelPassengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  from: { type: Number },
  to: { type: Number },
  countPlace: { type: Number },
  duration: { type: Number }
})

module.exports = mongoose.model('Trip', tripSchema);
