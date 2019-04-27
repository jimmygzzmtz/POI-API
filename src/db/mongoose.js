const mongoose = require('mongoose')

var MongoUser = process.env.MongoUser
var MongoPassword = process.env.MongoPassword

const connectionURL = 'mongodb+srv://' + MongoUser + ':' + MongoPassword + '@cluster0-ae70y.mongodb.net/poiapi?retryWrites=true'

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})



