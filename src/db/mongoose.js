const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://jimmygzzmtz:<password>@cluster0-ae70y.mongodb.net/poiapi?retryWrites=true'

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})



