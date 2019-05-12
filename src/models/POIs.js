const mongoose = require('mongoose')

const POIs = mongoose.model('POIs', {
  name: {
    type: String
  },
  location: {
    type: String
  },
  type: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  maps: {
    type: String
  },
  createdBy: {
    type: String
  }
})

module.exports = POIs

