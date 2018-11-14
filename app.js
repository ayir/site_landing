const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(allowCrossDomain);
app.post('/save_email', (req, res) => {
  var data = req.body.email + '\n';
  fs.appendFile('emails.xls', data, (err) => {
    if (err) throw err;
    console.log('File created');
 });
  res.json('Email Received')
  console.log(req.body.email);
})


// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))  