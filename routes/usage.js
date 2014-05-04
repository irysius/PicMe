var express = require('express');
var database = require('./../model/database');
var nodemailer = require('nodemailer');
var usage = new express.Router();

usage.post('/create', function (req, res, next) {
	var userid = parseInt(req.body.userid);
	var imageid = parseInt(req.body.imageid);
	var permissions = req.body.permissions;

	database.createUsage(userid, imageid, permissions, function (result) {
		console.log('createUsage');
		if (!result.result) res.json(result);

		console.log(imageid);
		database.getImage(imageid, function (result2) {
			console.log('createUsage2');
			if (result2.result) {
				var userid = result2.data.userid;
				console.log(imageid);
				database.getUser(userid, function (result3) {
					console.log('createUsage3');
					console.log(result3.data.email);
					if (result3.result) {
						var email = result3.data.email;
						console.log('emailing');
						sendemail(email);
					}
				})
			}
		}, true);
		
		res.json(result);
	});
})

usage.get('/:imageid(\\d+)', function (req, res, next) {
	var imageid = req.params.imageid;

	database.getUsages(imageid, function (result) {
		res.json(result);
	})
})

function sendemail(email) {
	var transport = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
			user: 'pickmehhsickkids@gmail.com',
			pass: 'pickme123'
		}
	})
	var mailOptions = {
		from: 'pickmehhsickkids@gmail.com',
		to: email,
		subject: 'Medical Image Usage',
		text: 'Your physician xyz just used your image for the following purposes'
	}
	transport.sendMail(mailOptions, function (err, status) {
		console.log(err);
		console.log(status);
	});
}

module.exports = usage;