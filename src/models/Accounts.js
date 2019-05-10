const mongoose = require('mongoose')
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
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

// una relacion entre dos Schemas, no lo guarda, es virtual 
accountSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'createdBy'
})

accountSchema.methods.toJSON = function() {
  const account = this
  const obj = account.toObject()

  delete obj.password
  delete obj.tokens

  return obj
}

accountSchema.statics.findByCredentials = function(username, password) {
  return new Promise( function(resolve, reject) {
    Accounts.findOne({ username }).then(function(account) {
      if( !account ) {
        return reject('Account does not exist')
      }
      bcrypt.compare(password, account.password).then(function(match) {
        if(match) {
          return resolve(account)
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
  const account = this
  const token = jwt.sign({ _id: account._id.toString() }, 'superSecret', { expiresIn: '7 days'})
  account.tokens = account.tokens.concat({ token })
  return new Promise(function( resolve, reject) {
    account.save().then(function(account){
      return resolve(token)
    }).catch(function(error) {
      return reject(error)
    })
  })
}

accountSchema.pre('save', function(next) {
  const account = this
  if( account.isModified('password') ) {
    bcrypt.hash(account.password, 8).then(function(hash){
      account.password = hash
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