const express = require('express')

require('./db/mongoose')
const POI = require('./models/POIs')
const Account = require('./models/Accounts')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

//Admin

app.post('/:username/:password/pois', function(req, res){
  
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
  
})

app.get('/:username/:password/pois/:id', function(req, res) {
  
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
  
})


app.patch('/:username/:password/pois/:id', function(req, res) {
  
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
  
})

app.delete('/:username/:password/pois/:id', function(req, res) {
  
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
    POI.findOneAndDelete(_id).then(function(poi) {
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
  
})

//User

app.get('/pois', function(req, res) {
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

app.get('/pois/location/:location', function(req, res) {
  POI.find({ location: req.params.location}).then(function(poi) {
    if(!poi){
      return res.status(404).send()
    }
    return res.send(poi)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.get('/pois/location/:location/type/:type', function(req, res) {
  POI.find({ location: req.params.location, type: req.params.type}).then(function(poi) {
    if(!poi){
      return res.status(404).send()
    }
    return res.send(poi)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.get('/pois/type/:type', function(req, res) {
  POI.find({type: req.params.type}).then(function(poi) {
    if(!poi){
      return res.status(404).send()
    }
    return res.send(poi)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.listen(port, function() {
  console.log('Server up and running on port ' + port)
})
