'use strict';

angular.module('home-photo', [
    ])

.controller('PhotoCtrl', function($scope, $state, $stateParams, layout, $ionicScrollDelegate, photo) {
    layout.setHeaderTitle('Photo Release');

    if ($stateParams.id > 0) {
        $scope.presentation = presentations.get($stateParams.id);
    }
    else
    {
        $scope.presentation = [];
        $scope.presentation.id = 0;
    }

    $scope.savePhoto = function() {
        //$scope.selectedId = presentation.id;
        //$state.go('builder.presentation', {'id' : presentation.id});
    };
})
;