var express = require('express');
var database = require('./../model/database');
var permission = express.Router();

permission.post('/update', function (req, res, next) {
	var userid = req.params.userid;
	var imageid = req.params.imageid;
	var permissions = req.params.permissions;

	var result = database.updatePermission(userid, imageid, permissions);
	res.json(result);
})
module.exports = permission;

