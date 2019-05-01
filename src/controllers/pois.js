const POI = require('./models/POIs')
const Account = require('./models/Accounts')

app.use(cors())

 app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

const getPois = function(req, res) {
  Account.find({ username: req.params.username, password: req.params.password}).then(function(account) {
    if(!account){
      return res.status(404).send()
    }

    if(account.length == 0){
      return res.status(400).send({
        error: 'Account not recognized'
      })
    }

    const poi = new POI(req.body)
    poi.save().then(function() {
      return res.send(poi)
    }).catch(function(error) {
      return res.status(400).send(error)
    })

  }).catch(function(error) {
    return res.status(500).send(error)
  })

}

const getPoi = function(req, res) {
  
  Account.find({ username: req.params.username, password: req.params.password}).then(function(account) {

    if(!account){
      return res.status(404).send()
    }

    if(account.length == 0){
      return res.status(400).send({
        error: 'Account not recognized'
      })
    }

    const _id = req.params.id
    POI.findById(_id).then(function(poi) {
      if(!poi){
        return res.status(404).send()
      }
      return res.send(poi)
    }).catch(function(error) {
      return res.status(500).send(error)
    })

  }).catch(function(error) {
    return res.status(500).send(error)
  })
  
}


const createPoi = function(req, res) {
  Account.find({ username: req.params.username, password: req.params.password}).then(function(account) {

    if(!account){
      return res.status(404).send()
    }

    if(account.length == 0){
      return res.status(400).send({
        error: 'Account not recognized'
      })
    }

    const _id = req.params.id;
    POI.findOneAndUpdate({_id: _id}, req.body).then(function(poi) {
      if(!poi) {
        return res.status(404).send()
      }
      return res.status(200).send(poi)
    }).catch(function(error) {
      return res.status(500).send(error)
    })

  }).catch(function(error) {
    return res.status(500).send(error)
  })
  
}

const deletePoi = function(req, res) {
  
  Account.find({ username: req.params.username, password: req.params.password}).then(function(account) {
    
    if(!account){
      return res.status(404).send()
    }

    if(account.length == 0){
      return res.status(400).send({
        error: 'Account not recognized'
      })
    }

    const _id = req.params.id
    POI.findOneAndDelete({_id: _id}).then(function(poi) {
      if(!poi){
        return res.status(404).send()
      }
      return res.send(poi)
    }).catch(function(error) {
      return res.status(500).send(error)
    })

  }).catch(function(error) {
    return res.status(500).send(error)
  })

}


const getAllPois = app.get('/pois', function(req, res) {

  const _id = req.params.id
  //POI.find( { type: { $ne: "account" } } ).then(function(poi) {
  POI.find().then(function(poi) {
    if(!poi){
      return res.status(404).send()
    }
    return res.send(poi)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

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

module.exports = {
    getPois: getPois,
    getPoi: getPoi,
    createPoi: createPoi,
    deletePoi: deletePoi,
    getAllPois: getAllPois,
    getLocation: getLocation,
    getLocationType: getLocationType,
    getType: getType
}