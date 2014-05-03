var express = require('express');
var image = express.Router();
var nodemailer = require('nodemailer');
var database = require('./../model/database');

image.post('/create', function (req, res, next) {
	var userid = parseInt(req.body.userid);
	var data = req.body.data;
	var permissions = req.body.permissions;

	database.createImage(userid, data, permissions, function (result) {
		if (!result.result) res.json(result);
		database.getUser(userid, function (result2) {
			console.log('createImage getUser');
			console.log(userid);
			console.log(result2);
			//var transport = nodemailer.createTransport('Direct');
			var transport = nodemailer.createTransport('SMTP', {
				service: 'Gmail',
				auth: {
					user: 'pickmehhsickkids@gmail.com',
					pass: 'pickme123'
				}
			})
			var mailOptions = {
				from: 'pickmehhsickkids@gmail.com',
				to: result2.data.email,
				subject: 'Medical Image Alert',
				text: 'You have just allowed a physician to use your picture for the following purposes...'
			}
			console.log(mailOptions);
			transport.sendMail(mailOptions, function(error, responseStatus) {
				console.log('mail return');
				console.log(error);
				console.log(responseStatus);
			});
			res.json(result);
		});
	});
})

image.get('/', function (req, res, next) {
	var userid = parseInt(req.query.userid);
	
	database.getImages(userid, function (result) {
		res.json(result);
	});
})

image.get('/:imageid(\\d+)', function (req, res, next) {
	var imageid = req.params.imageid;

	database.getImage(imageid, function (result) {
		res.json(result);
	})
})

module.exports = image;