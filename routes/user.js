var express = require('express');
var database = require('./../model/database');
var user = new express.Router();

user.post('/create', function (req, res, next) {	
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	//if (!password) {
	database.createUser(username, email, function (result) {
		res.json(result);
	});
	// } else {
	// 	result = database.createUser(username, email, password);
	// }
})
user.post('/update', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var newemail = req.body.newemail;
	var newpassword = req.body.newpassword;
	database.updateUser(username, password, newemail, newpassword, function (result) {
		res.json(result);
	});
})

module.exports = user;


