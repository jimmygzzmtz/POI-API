const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const Accounts = mongoose.model('Accounts', {
//   username: {
//     type: String
//   },
//   password: {
//     type: String
//   }
// })

const accountSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
})

accountSchema.statics.findByCredentials = function(username, password) {
  return new Promise( function(resolve, reject) {
    Account.findOne({ username }).then(function(user) {
      if( !user ) {
        return reject('User does not exist')
      }
      bcrypt.compare(password, user.password).then(function(match) {
        if(match) {
          return resolve(user)
        } else {
          return reject('Wrong password!')
        }
      }).catch( function(error) {
        return reject('Wrong password!')
      })
    })
  })
}

accountSchema.methods.generateToken = function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'superSecret', { expiresIn: '7 days'})
  user.tokens = user.tokens.concat({ token })
  return new Promise(function( resolve, reject) {
    user.save().then(function(user){
      return resolve(token)
    }).catch(function(error) {
      return reject(error)
    })
  })
}

accountSchema.pre('save', function(next) {
  const user = this
  if( user.isModified('password') ) {
    bcrypt.hash(user.password, 8).then(function(hash){
      user.password = hash
      next()
    }).catch(function(error){
      return next(error)
    })
  } else {
    next()  
  }
})

const Accounts = mongoose.model('Accounts', accountSchema)

module.exports = Accounts