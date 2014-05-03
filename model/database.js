var mysql = require('mysql');
var connectionString = 'mysql://mypic:mypic123@localhost/mypic';
var connection = mysql.createConnection(connectionString);

var database = {
	login: function (username, password) {
		var query = 'SELECT * FROM users ' + 
			'WHERE username = ? AND password = ? ';

		connection.query(query, [username, password], function (err, rows) {
			if (!!err) {
				return { result: false, error: err };
			} else {
				console.log('login', rows);
				var id = rows[0]['userid'];
				return { result: true, id: id };
			}
		})
	},
	createUser: function (username, email) {
		var query = 'INSERT INTO users ' + 
			'(username, email) ' + 
			'VALUES (?, ?) ';

		connection.query(query, [username, email], function (err, rows) {
			if (!!err) {
				return { result: false, error: err };
			} else {
				console.log('createUser', rows.insertId);
				return { result: true, id: rows.insertId };
			}
		})
	},
	createUser: function (username, email, password) {
		var query = 'INSERT INTO users ' + 
			'(username, email, salt, password) ' + 
			'VALUES (?, ?, ?, ?) ';

		connection.query(query, [username, email, password], function (err, rows) {
			if (!!err) {
				return { result: false, error: err };
			} else {
				console.log('createUser', rows.insertId);
				return { result: true, id: rows.insertId };
			}
		})
	},
	updateUser: function (username, password, newemail, newpassword) {
		var query = 'UPDATE users ' + 
			'SET ? ' + 
			'WHERE username = ? AND password = ? ';

		var update = { };
		if (!!newpassword) update.password = newpassword;
		if (!!newemail) update.email = newemail;

		connection.query(query, [update, username, password], function (err, rows) {
			if (!!err) {
				return { result: false, error: err };
			} else {
				console.log('updateUser', rows.affectedRows);
				return { result: rows.affectedRows > 0 };
			}
		})
	},
	createImage: function (userid, data, permissions) {
		var query = 'INSERT INTO images ' + 
			'(userid, data, permissions) ' + 
			'(?, ?, ?) ';

		connection.query(query, [userid, data, permissions], function (err, rows) {
			if (!!err) {
				return { result: false, error: err };
			} else {
				console.log('createImage', rows.insertId);
				return { result: true, id: rows.insertId };
			}
		})
	},
	getImages: function (userid) {
		var query = 'SELECT * FROM images ' + 
			'WHERE userid = ? ';

		connection.query(query, [userid], function (err, rows) {
			if (!!err) {
				return { result: false, error: err };
			} else {
				console.log('getImages', rows.length);
				var i = 0;
				var r = [];
				for (; i < rows.length; ++i) {
					var row = rows[i];
					r.push(row);
				}
				return { result: true, data: r };
			}
		})
	},
	updatePermission: function (userid, imageid, permissions) {
		var query = 'UPDATE images ' + 
			'SET permission = ?, updated = ? ' + 
			'WHERE userid = ? AND imageid = ? ';

		connection.query(query, [permissions, new Date(), userid, imageid], function (err, rows) {
			if (!!err) {
				return { result: false, error: err };
			} else {
				console.log('updatePermission', rows.affectedRows);
				return { result: rows.affectedRows > 0 };
			}
		})

		return { result: false };
	},
	createUsage: function (userid, imageid, permissions) {
		var query = 'INSERT INTO usage ' + 
			'(userid, imageid, permissions) ' + 
			'VALUES (?, ?, ?) ';

		connection.query(query, [userid, imageid, permissions], function (err, rows) {
			if (!!err) {
				return { result: false, error: err };
			} else {
				console.log('createUsage', rows.affectedRows);
				return { result: rows.affectedRows > 0 };
			}
		})
	}

}

module.exports = database;