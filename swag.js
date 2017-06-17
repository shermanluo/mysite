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
app.use(express.Router());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(htmlPath));

app.post('/', function(req, res) {
  console.log("done");
  var mailOptions = {
  from: 'shermyluo@gmail.com',
  to: 'shermanluo@berkeley.edu',
  subject: req.body.firstname + " " + req.body.lastname,
  text: req.body.message
  };
  console.log(req.body.firstname);
  transporter.sendMail(mailOptions, function(error, info){
  console.log("HELLO");
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    console.log("1 record inserted");
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var myobj = { firstname: req.body.firstname, lastname: req.body.lastname, message: req.body.message};
	console.log("test");
	db.collection("contact").insertOne(myobj, function(err, res) {
	if (err) throw err;
	console.log("success!");
	db.close();
	});
});
res.end();
});
app.all('*', function(req, res, next) {	
	console.log('https://' + req.hostname + req.originalUrl);   
	console.log(req.protocol === 'https');
	if (!req.protocol === 'https') {return res.redirect('https://' + req.hostname + req.originalUrl);
	} else {
		console.log("going");
		next();
	}
}); 
app.get('*', function (req, res) {
  res.sendFile(htmlPath + '/MyWebsite.html');
})

var server = app.listen(process.env.PORT || 5000, function () {
});


