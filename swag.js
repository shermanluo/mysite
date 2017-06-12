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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(htmlPath));

app.post('/action', function(req, res) {
  var mailOptions = {
  from: 'shermyluo@gmail.com',
  to: 'shermanluo@berkeley.edu',
  subject: req.body.firstname + " " + req.body.lastname,
  text: req.body.message
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

});


var server = app.listen(8080, function () {
  
});


