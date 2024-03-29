const express = require('express')
const cors = require('cors');

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
];

require('./db/mongoose')
const router = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(router)
app.use(cors())

 app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

app.listen(port, function() {
  console.log('Server up and running on port ' + port)
})
