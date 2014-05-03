var express = require('express');
var database = require('./../model/database');
var account = new express.Router();

account.post('/login', function (req, res, next) {
	var username = req.params.username;
	var password = req.params.password;

	var result = database.login(username, password);
	res.json(result);
})

module.exports = account;