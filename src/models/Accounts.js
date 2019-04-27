const mongoose = require('mongoose')

const Accounts = mongoose.model('Accounts', {
  username: {
    type: String
  },
  password: {
    type: String
  }
})

module.exports = Accounts

