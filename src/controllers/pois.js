const POI = require('../models/POIs')
const Account = require('../models/Accounts')

const createPoi = function(req, res) {
  const poi = new POI({
    name: req.body.name,
    location: req.body.location,
    type: req.body.type,
    description: req.body.description,
    image: req.body.image,
    maps: req.body.maps,
    createdBy: req.account._id
  })
  poi.save().then(function() {
    return res.send(poi)
  }).catch(function(error) {
    return res.status(400).send(error)
  })
}

const getPoi = function(req, res) {
  const _id = req.params.id
    POI.findById(_id).then(function(poi) {
      if(!poi){
        return res.status(404).send()
      }
      return res.send(poi)
    }).catch(function(error) {
      return res.status(500).send(error)
    })
}

const updatePoi = function(req, res) {
  if(req.account.id == "5cd5fc176c1e940017a32339"){
    const _id = req.params.id;
    POI.findOneAndUpdate({_id: _id}, req.body).then(function(poi) {
      if(!poi) {
        return res.status(404).send()
      }
      return res.status(200).send(poi)
    }).catch(function(error) {
      return res.status(500).send(error)
    })
  }
  else{
    const _id = req.params.id;
    POI.findOneAndUpdate({_id: _id, createdBy: req.account.id}, req.body).then(function(poi) {
      if(!poi) {
        return res.status(404).send()
      }
      return res.status(200).send(poi)
    }).catch(function(error) {
      return res.status(500).send(error)
    })
  }
  
}

const deletePoi = function(req, res) {
  if(req.account.id == "5cd5fc176c1e940017a32339"){
    const _id = req.params.id
    POI.findOneAndDelete({_id: _id}).then(function(poi) {
      if(!poi){
        return res.status(404).send()
      }
      return res.send(poi)
    }).catch(function(error) {
      return res.status(500).send(error)
    })
  }
  else{
    const _id = req.params.id
    POI.findOneAndDelete({_id: _id, createdBy: req.account.id}).then(function(poi) {
      if(!poi){
        return res.status(404).send()
      }
      return res.send(poi)
    }).catch(function(error) {
      return res.status(500).send(error)
    })
  }
  
}

const getAllPois = function(req, res) {
  const _id = req.params.id
  POI.find().then(function(poi) {
    if(!poi){
      return res.status(404).send()
    }
    return res.send(poi)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
}

const getLocation = function(req, res) {
 POI.find({ location: new RegExp("^" + req.params.location.toLowerCase(), "i")}).then(function(poi) {
    if(!poi){
      return res.status(404).send()
    }
    return res.send(poi)
  }).catch(function(error) {
    return res.status(500).send(error)
  })

}

const getLocationType = function(req, res) {
  POI.find({ location: new RegExp("^" + req.params.location.toLowerCase(), "i"), type: new RegExp("^" + req.params.type.toLowerCase(), "i")}).then(function(poi) {
    if(!poi){
      return res.status(404).send()
    }
    return res.send(poi)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
}

const getType = function(req, res) {
  POI.find({type: new RegExp("^" + req.params.type.toLowerCase(), "i")}).then(function(poi) {
    if(!poi){
      return res.status(404).send()
    }
    return res.send(poi)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
}

const createAccount = function(req, res) {
  const account = new Account(req.body)
  account.save().then(function() {
    return res.send(account)
  }).catch(function(error) {
    return res.status(400).send(error)
  })
}

const login = function(req, res) {
  Account.findByCredentials(req.body.username, req.body.password).then(function(account) {
    account.generateToken().then(function(token) {
      return res.send({account, token})
    }).catch(function(error) {
      return res.status(401).send({error: error})
    })
  }).catch(function(error) {
    return res.status(401).send({error:error})
  })
}

const logout = function(req, res) {
  req.account.tokens = req.account.tokens.filter(function(token) {
    return token.token !== req.token
  })
  req.account.save().then(function() {
    return res.send()
  }).catch(function(error) {
    return res.status(500).send({error: error})
  })
}

module.exports = {
    createPoi: createPoi,
    getPoi: getPoi,
    updatePoi: updatePoi,
    deletePoi: deletePoi,
    getAllPois: getAllPois,
    getLocation: getLocation,
    getLocationType: getLocationType,
    getType: getType,
    createAccount: createAccount,
    login: login,
    logout: logout
}