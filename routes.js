var account = require('./routes/account');
var image = require('./routes/image');
var permission = require('./routes/permission');
var usage = require('./routes/usage');
var user = require('./routes/user');
var routes = {
	setupRoutes: function (app) {
		app.use('/account', account);
		app.use('/image', image);
		app.use('/permission', permission);
		app.use('/usage', usage);
		app.use('/user', user);
	}
}

module.exports = routes;
