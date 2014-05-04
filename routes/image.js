var express = require('express');
var image = express.Router();
var nodemailer = require('nodemailer');
var database = require('./../model/database');
var dataFolder = 'data/';
var fs = require('fs');

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
			
			var mailOptions = {
				from: 'pickmehhsickkids@gmail.com',
				to: result2.data.email,
				subject: 'Medical Image Alert',
				text: 'You have just allowed a physician to use your picture for the following purposes...'
			}
			console.log(mailOptions);
			sendemail(mailOptions);
			
			res.json(result);
		});
	});
})

image.post('/email', function (req, res, next) {
	var email = req.body.email;
	var imageid = parseInt(req.body.imageid);

	var rawData = fs.readFileSync(dataFolder + imageid + '.txt', 'utf8');

	var mailOptions = {
		from: 'pickmehhsickkids@gmail.com',
		to: email,
		subject: 'Medical Image Request',
		text: 'Attached is the image you requested',
		attachments: [
			{
				fileName: 'image.png',
				contents: new Buffer(rawData.substring(22), 'base64')
			}
		]
	}

	console.log('attempting an image send');
	sendemail(mailOptions);
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

function sendemail(mailoptions) {
	var transport = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
			user: 'pickmehhsickkids@gmail.com',
			pass: 'pickme123'
		}
	})

	transport.sendMail(mailoptions, function(error, responseStatus) {
		console.log('mail return');
		console.log(error);
		console.log(responseStatus);
	});
}

module.exports = image;