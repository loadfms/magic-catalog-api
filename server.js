// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var categoryRoutes = require('./actions/category/routes');
var productRoutes = require('./actions/product/routes');
var uploader = require('./actions/s3/index');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

categoryRoutes.register(router);
productRoutes.register(router);
new uploader.S3Uploader(router);



// more routes for our API will happen here
app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('api running on port 8080');