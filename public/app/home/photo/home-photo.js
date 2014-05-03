'use strict';

angular.module('home-photo', [
    ])

.controller('PhotoCtrl', function($scope, $state, $stateParams, layout, $ionicScrollDelegate, photos) {
    layout.setHeaderTitle('Photo Release');

    if ($stateParams.id > 0) {
        console.log('sdf');
        $scope.photo = photos.get($stateParams.id);
    }
    else
    {
        console.log('len:' + photos.length);
        $scope.photo = photos.get(0);
    }

    $scope.savePhoto = function() {
        //$scope.selectedId = presentation.id;
        //$state.go('builder.presentation', {'id' : presentation.id});
    };
})
;