var mysql = require('mysql');
var fs = require('fs');
var connectionString = 'mysql://mypic:mypic123@localhost/mypic';
var connection = mysql.createConnection(connectionString);
var dataFolder = 'data/';

var database = {
	login: function (username, password, callback) {
		var query = 'SELECT * FROM users ' + 
			'WHERE username = ? AND password = ? ';

		connection.query(query, [username, password], function (err, rows) {
			if (!!err) {
				console.log('login');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				console.log('login', rows);
				var id = rows[0]['userid'];
				callback({ result: true, id: id });
			}
		})
	},
	createUser: function (username, email, callback) {
		console.log(username, email);
		var select = 'SELECT * FROM users ' + 
			'WHERE email = ? ';
		var insert = 'INSERT INTO users ' + 
			'(username, email) ' + 
			'VALUES (?, ?) ';

		connection.query(select, [email], function (err, rows) {
			if (!!err) {
				console.log('createUser2Select');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				if (rows.length == 0) {
					connection.query(insert, [username, email], function (err2, rows2) {
						if (!!err2) {
							console.log('createUser2Insert');
							console.log(err2);
							callback({ result: false, error: err2 });
						} else {
							console.log('createUser', rows2.insertId);
							callback({ result: true, id: rows2.insertId });
						}
					})
				} else {
					console.log(rows[0]);
					callback({ result: true, id: rows[0].userid });
				}
			}
		})
		
	},
	createUser3: function (username, email, password, callback) {
		var query = 'INSERT INTO users ' + 
			'(username, email, salt, password) ' + 
			'VALUES (?, ?, ?, ?) ';

		connection.query(query, [username, email, password], function (err, rows) {
			if (!!err) {
				console.log('createUser3');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				console.log('createUser', rows.insertId);
				callback({ result: true, id: rows.insertId });
			}
		})
	},
	updateUser: function (username, password, newemail, newpassword, callback) {
		var query = 'UPDATE users ' + 
			'SET ? ' + 
			'WHERE username = ? AND password = ? ';

		var update = { };
		if (!!newpassword) update.password = newpassword;
		if (!!newemail) update.email = newemail;

		connection.query(query, [update, username, password], function (err, rows) {
			if (!!err) {
				console.log('updateUser');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				console.log('updateUser', rows.affectedRows);
				callback({ result: rows.affectedRows > 0 });
			}
		})
	},
	getUser: function (userid, callback) {
		var query = 'SELECT * FROM users ' + 
			'WHERE userid = ? ';

		connection.query(query, [userid], function (err, rows) {
			if (!!err) {
				console.log('getUser');
				console.log(err);
			} else {
				if (rows.length == 0) {
					callback({ result: false });
				} else {
					callback({ result: true, data: rows[0] });
				}
			}
		})
	},
	createImage: function (userid, data, permissions, callback) {
		var query = 'INSERT INTO images ' + 
			'(userid, permissions) ' + 
			'VALUES (?, ?) ';
		console.log(userid);
		console.log(permissions);
		connection.query(query, [userid, permissions], function (err, rows) {
			if (!!err) {
				console.log('createImage');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				console.log('createImage', rows.insertId);
				fs.writeFile(dataFolder + rows.insertId + '.txt', data, function (err) {
					console.log('saving file');
					if (err) console.log(err);
					else {
						callback({ result: true, id: rows.insertId })
					};
				})
			}
		})
	},
	getImages: function (userid, callback) {
		var query = 'SELECT * FROM images ';

		connection.query(query, function (err, rows) {
			if (!!err) {
				console.log('getImages');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				console.log('getImages', rows.length);
				var i = 0;
				var r = [];
				for (; i < rows.length; ++i) {
					var row = rows[i];
					var filename = dataFolder + row.imageid + '.txt';
					var text = fs.readFileSync(filename, 'utf8');
					row.data = text;
					r.push(row);
				}
				callback({ result: true, data: r });
			}
		})
	},
	getImage: function (imageid, callback) {
		var query = 'SELECT * FROM images WHERE imageid = ? ';

		connection.query(query, [imageid], function (err, rows) {
			if (!!err) {
				console.log('getImage');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				console.log('getImage', rows.length);
				if (rows.length == 0) callback({ result: false });
				else {
					var row = rows[0];
					var filename = dataFolder + row.imageid + '.txt';
					var text = fs.readFileSync(filename, 'utf8');
					row.data = text;
					callback({ result: true, data: row });
				}
			}
		})
	},
	updatePermission: function (userid, imageid, permissions, callback) {
		var query = 'UPDATE images ' + 
			'SET permission = ?, updated = ? ' + 
			'WHERE userid = ? AND imageid = ? ';

		connection.query(query, [permissions, new Date(), userid, imageid], function (err, rows) {
			if (!!err) {
				console.log('updatePermission');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				console.log('updatePermission', rows.affectedRows);
				callback({ result: rows.affectedRows > 0 });
			}
		})

		return { result: false };
	},
	createUsage: function (userid, imageid, permissions, callback) {
		console.log(userid, imageid, permissions);
		var query = 'INSERT INTO `usage` ' + 
			'(userid, imageid, permissions) ' + 
			'VALUES (?, ?, ?) ';

		connection.query(query, [userid, imageid, permissions], function (err, rows) {
			if (!!err) {
				console.log('createUsage');
				console.log(err);
				callback({ result: false, error: err });
			} else {
				console.log('createUsage', rows.affectedRows);
				callback({ result: rows.affectedRows > 0 });
			}
		})
	}

}

module.exports = database;