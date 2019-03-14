const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  age: { type: Number },
  phone: { type: String  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  image: { type: String },
  password: { type: String, required: true },
  car: {
    brand: { type: String },
    year: { type: Number },
    countPeople: { type: Number }
  },
  trips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip"
  }],
  description: { type: String }
})

module.exports = mongoose.model('User', userSchema);
