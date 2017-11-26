var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authapi-experiment');
var UserModel = require('./models/userModel');

passport.use(new Strategy(
  function(username, password, cb) {
    UserModel.findOne({ email: username }, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  UserModel.findOne({ _id: id }, function(err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

var app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/user/create',
  function(req, res) {
    res.json({
      teste: 'home'
    });
  });

app.listen(3000);
