'use strict';

angular.module('home-library', [
    ])

.controller('LibraryCtrl', function($scope, $state, $stateParams, layout, $ionicScrollDelegate, photos) {
    layout.setHeaderTitle('Photo Library');

})
;