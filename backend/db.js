const db = require('mongoose')
const password = process.env.dataBasePassword
db.connect('mongodb://Eka:'+ password +'@cluster0-shard-00-00-phl47.mongodb.net:27017,cluster0-shard-00-01-phl47.mongodb.net:27017,cluster0-shard-00-02-phl47.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
  useCreateIndex: true,
  useNewUrlParser: true
})
