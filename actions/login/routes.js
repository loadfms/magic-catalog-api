var express = require('express');
var login = require('./index');

module.exports = {
  register(router) {
    router.post('/api/:app/login', function (req, res) {
      login.post(function (result) {
        if (result) {
          res.json(result);
        } else {
          res.json(401, 'login failed')
        }
      }, req.params.app, req.body)
    });

    router.post('/api/:app/checklogin', function (req, res) {
      if (req.body.hash == '-1112471833') {
        res.json(true);
      } else {
        res.json(401, 'login failed')
      }
    }
    );
  }
}