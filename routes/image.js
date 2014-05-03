var express = require('express');
var image = express.Router();
var database = require('./../model/database');

image.post('/create', function (req, res, next) {
	var userid = req.params.userid;
	var data = req.params.data;
	var permissions = req.params.permissions;

	var result = database.createImage(userid, data, permissions);
	res.json(result);
})

image.get('/', function (req, res, next) {
	var userid = req.query.userid;
	
	var result = database.getImages(userid);
	res.json(result);
})

module.exports = image;