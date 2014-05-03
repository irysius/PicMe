var express = require('express');
var database = require('./../model/database');
var permission = express.Router();

permission.post('/update', function (req, res, next) {
	var userid = parseInt(req.body.userid);
	var imageid = parseInt(req.body.imageid);
	var permissions = req.body.permissions;

	database.updatePermission(userid, imageid, permissions, function (result) {
		res.json(result);
	});
})
module.exports = permission;

