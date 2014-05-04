angular.module('usages', [])
    .factory('usages', function($http, $filter) {
        var self = this;
        var usages = [];

        return {
            get: function(id, callback) {
                $http.get('usage/' + id).success(function(data) {
                    console.log(data.data)
                    callback(data.data);

                });
            },
            getAll: function() {
                $http.get('/usages').success(function(data) {
                    for (var i = 0; i < data.data.length; i++) {
                        var usage = {
                            'id': data.data[i].imageid,
                            'imageid': data.data[i]
                        };
                        self.usages.push(usage);
                    }
                });
                return self.usages;

            },
            clear: function() {
                self.usages = [];
                return true;
            }
        };
    });