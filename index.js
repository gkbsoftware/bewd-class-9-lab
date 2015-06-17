// we need to require 'express' module
var express = require('express');
var app = express();

require('dotenv').load();

var port = process.env.PORT || 8000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

var Twitter = require('twitter');

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// A GET method route
app.get('/', function (req, res) {
  res.send('GET index page.');
});

// A POST method route
app.post('/', function (req, res) {
  res.send('POST index page.');
});

app.get('/tweets', function (req, res) {
  var q = req.query.q || 'javascript';
  twitter.get('search/tweets', { q: q }, function(error, tweets, response){
    //res.send(tweets);
    res.render('tweets', tweets);
  });
});

app.get('/user', function (req, res) {
  res.send('this is your user account');
});

app.get('/login', function (req, res) {
  res.send('Hello, '+req.query.user);
});

//boot up the server
app.listen(port);
console.log('The server is listening to ' + port);
