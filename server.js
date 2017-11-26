var express = require('express');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/authapi-experiment');
var UserModel = require('./models/userModel');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'authapisecretexp';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  UserModel.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  });
}));

app.post('/api/user/create',
  function(req, res) {
    UserModel.findOne({ email: req.body.email }, function(err, user) {
        if(user){
          res.json({
            mensagem: 'E-mail já existente',
          });
        }else {
            var user = new UserModel({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                telefones: req.body.telefones,
            });
            user.save(function(error, user){
                if(error) return console.error(error);
                res.json({
                  mensagem: 'Usuário criado com sucesso',
                  user: user,
                });
            })
        }
    });
  });

app.post('/api/user/login',
  function(req, res) {
    UserModel.findOne({ email: req.body.email }, function(err, user) {
        if(user){
          if(user.senha == req.body.senha){
            res.json(user);
          } else {
            res.json({
              mensagem: "Usuário e/ou senha inválidos",
            })
          }
        }else {
          res.json({
            mensagem: "Usuário e/ou senha inválidos",
          })
        }
    });
  });


app.listen(3000);
