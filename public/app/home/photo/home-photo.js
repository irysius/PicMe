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
        $scope.photo = photos.get(0);
    }

    var patCanvas = document.querySelector('#snapshot');
    if (!patCanvas) return;

    //patCanvas.width = _video.width;
    //patCanvas.height = _video.height;
    var ctxPat = patCanvas.getContext('2d');

    //var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
    ctxPat.putImageData($scope.photo.idata, 0, 0);

    //patData = idata;

    $scope.savePhoto = function() {
        //$scope.selectedId = presentation.id;
        //$state.go('builder.presentation', {'id' : presentation.id});
    };
})
;