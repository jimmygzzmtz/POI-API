const jwt = require('jsonwebtoken')
const Account = require('../models/Accounts')

const auth = function(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded =jwt.verify(token, 'superSecret')
        Account.findOne({_id: decoded._id, 'tokens.token': token}).then(function(account) {
            if (!account) {
                throw new Error()
            }
            req.token = token
            req.account = account
            next()
        }).catch(function(error) {
            res.status(401).send({error: 'Authentication required'})
        })
    } catch(e) {
        res.status(401).send({error: 'Authentication required'})
    }
}

module.exports = auth