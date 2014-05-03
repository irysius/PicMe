'use strict';

angular.module('home', [
])
.controller('HomeCtrl', function($scope, layout, $ionicScrollDelegate) {
    layout.setHeaderTitle('Home');
})
;
