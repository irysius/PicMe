var express = require('express');
var http = require('http');
var routes = require('./routes');

// Connect/Express middleware
var body_parser = require('body-parser');
var compression = require('compression');
var errorhandler = require('errorhandler');
var method_override = require('method-override');

var app = express();

// Settings
app.set('views', __dirname + '/views');
app.set('view engine', 'vash');

// Configuration
app.use(compression());
app.use(body_parser({ limit: '50mb' }));
app.use(method_override());

// Setting up the routes
routes.setupRoutes(app);

// Catch All
app.use(express.static(__dirname + '/public'));
app.use(errorhandler({ dumpExceptions: true, showStack: true }));

// Start the server
var httpServer = http.createServer(app);


httpServer.listen(1337); // use 0 to assign random port
httpServer.on('listening', function () {
    console.log('listening on port: ', httpServer.address().port);
});

// var httpsServer = https.createServer(options, app);
// httpsServer.listen(443);
