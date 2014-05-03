var express = require('express');
var database = require('./../model/database');
var usage = new express.Router();

usage.post('/create', function (req, res, next) {
	var userid = req.params.userid;
	var imageid = req.params.imageid;
	var permissions = req.params.permissions;

	var result = database.createUsage(userid, imageid, permissions);
	res.json(result);
})
module.exports = usage;