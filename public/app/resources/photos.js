angular.module('photos', [])
    .factory('photos', function ($http, $filter) {
        var photos = [];
        
        return {
            get: function(id) {
                return $filter('getById')(this.photos, id);
            },
            add: function(patData) {
            	var photo = { 'id': 0, 'idata': patData };
            	this.photos.push(photo);
            	return this.photos[0];
            }
        };
});