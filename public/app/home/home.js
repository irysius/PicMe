'use strict';

angular.module('home', [
	'home-photo'
])
.controller('HomeCtrl', function($scope, layout, $ionicScrollDelegate) {
    layout.setHeaderTitle('Home');
})
;
