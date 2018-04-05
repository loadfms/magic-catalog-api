// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var categoryRoutes = require('./actions/category/routes');
var loginRoutes = require('./actions/login/routes');
var product = require('./actions/product/index');
var uploader = require('./actions/s3/index');
var categoryproduct = require('./actions/categoryproduct/index');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

categoryRoutes.register(router);
loginRoutes.register(router);

new product.componentProduct(router);
new uploader.S3Uploader(router);
new categoryproduct.CategoryProduct(router);



// more routes for our API will happen here
app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
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
console.log('api running on port 8081');