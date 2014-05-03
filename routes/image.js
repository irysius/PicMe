var express = require('express');
var image = express.Router();
var database = require('./../model/database');

image.post('/create', function (req, res, next) {
	var userid = parseInt(req.body.userid);
	var data = req.body.data;
	var permissions = req.body.permissions;

	database.createImage(userid, data, permissions, function (result) {
		res.json(result);
	});
})

image.get('/', function (req, res, next) {
	var userid = parseInt(req.query.userid);
	
	var result = database.getImages(userid, function (result) {
		res.json(result);
	});
})

module.exports = image;