var express = require('express');
var database = require('./../model/database');
var user = new express.Router();

user.post('/create', function (req, res, next) {
	var username = req.params.username;
	var email = req.params.email;
	var password = req.params.password;

	var result;
	//if (!password) {
		result = database.createUser(username, email);
	// } else {
	// 	result = database.createUser(username, email, password);
	// }
	res.json(result);
})
user.post('/update', function (req, res, next) {
	var username = req.params.username;
	var password = req.params.password;
	var newemail = req.params.newemail;
	var newpassword = req.params.newpassword;
	var result = database.updateUser(username, password, newemail, newpassword);
	res.json(result);
})

module.exports = user;


