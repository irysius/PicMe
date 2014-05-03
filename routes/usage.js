var express = require('express');
var database = require('./../model/database');
var usage = new express.Router();

usage.post('/create', function (req, res, next) {
	var userid = parseInt(req.body.userid);
	var imageid = parseInt(req.body.imageid);
	var permissions = req.body.permissions;

	database.createUsage(userid, imageid, permissions, function (result) {
		res.json(result);
	});
})
module.exports = usage;