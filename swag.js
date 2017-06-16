var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shermyluo@gmail.com',
    pass: 'lovedad1'
  }
});

var htmlPath = path.join(__dirname, 'public');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_7xmghlz3:se7igu36ap1lboi5h4rgfk5eha@ds127132.mlab.com:27132/heroku_7xmghlz3";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(htmlPath));
app.get('*', function (req, res) {
  res.sendFile(htmlPath + '/MyWebsite.html');
})
app.post('/', function(req, res) {
  
res.sendStatus(204);
});


var server = app.listen(process.env.PORT || 5000, function () {
});


