angular.module('photos', [])
    .factory('photos', function ($http, $filter) {
        var self = this;

        var photos = [];
        
        return {
            get: function(id) {
                return $filter('getById')(self.photos, id);
            },
            getFromDb: function(id) {
                var photo;

                $http.get('/image/' + id).success(function (data) {
                    photo = { 'id': data.data.imageid, 'data': data.data.data };
                    return photo;
                });

                return photo;
            },
            getAll: function() {
                $http.get('/image').success(function (data) {
                    for (var i = 0; i < data.data.length; i++) {
                        var photo = { 
                            'id': data.data[i].imageid, 
                            'data': data.data[i].data,
                            'permission': {
                                'one': parseInt(data.data[i].permissions.substring(0,1)),
                                'two': parseInt(data.data[i].permissions.substring(1,2)),
                                'three': parseInt(data.data[i].permissions.substring(2,3)),
                                'four': parseInt(data.data[i].permissions.substring(3,4))
                            },
                            'userid': data.data[i].userid
                        };
                        self.photos.push(photo);     
                    }
                });
            	return self.photos;
                
            },
            add: function(pngBase64) {            	
            	var photo = { 'id': 0, 'data': pngBase64 };
            	self.photos.push(photo);
            	return self.photos[0];
            },
            clear: function() {
                self.photos = [];
                return true;
            }
        };
});