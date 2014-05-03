angular.module('photos', [])
    .factory('photos', function ($http, $filter) {
        var photos = [];
        
        return {
            get: function(id) {
                return $filter('getById')(this.photos, id);
            },
            getAll: function() {
            	return photos.photos;
            },
            add: function(pngBase64) {            	
            	var photo = { 'id': 0, 'data': pngBase64 };
            	this.photos.push(photo);
            	return this.photos[0];
            }
        };
});