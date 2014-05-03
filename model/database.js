var mysql = require('mysql');
var connectionString = 'mysql://mypic:mypic123@localhost/mypic';

var database = {
	login: function (username, password) {
		var query = 'SELECT * FROM users ' + 
			'WHERE username = ? AND password = ? ';

		return { result: false };
	},
	createUser: function (username, email) {
		var query = 'INSERT INTO users ' + 
			'(username, email) ' + 
			'VALUES (?, ?) ';

		return { result: false, id: '' };
	},
	createUser: function (username, email, password) {
		var query = 'INSERT INTO users ' + 
			'(username, email, salt, password) ' + 
			'VALUES (?, ?, ?, ?) ';

		return { result: false, id: '' };
	},
	updateUser: function (username, password, newemail, newpassword) {
		var query = 'UPDATE users ' + 
			'SET password = ?, email = ? ' + 
			'WHERE username = ? AND password = ? ';

		return { result: false, id: '' };
	},
	createImage: function (userid, data, permissions) {
		var query = 'INSERT INTO images ' + 
			'(userid, data, permissions) ' + 
			'(?, ?, ?) ';

		return { result: false, id: '' };
	},
	getImages: function (userid) {
		var query = 'SELECT * FROM images ' + 
			'WHERE userid = ? ';
		console.log(userid);
		return { result: false };
	},
	updatePermission: function (userid, imageid, permissions) {
		var query = 'UPDATE images ' + 
			'SET permission = ?, updated = ? ' + 
			'WHERE userid = ? AND id = ? ';

		return { result: false };
	},
	createUsage: function (userid, imageid, permissions) {
		var query = 'INSERT INTO usage ' + 
			'(userid, imageid, permissions) ' + 
			'VALUES (?, ?, ?) ';
		return { result: false };
	}

}

module.exports = database;