'use strict';

angular.module('home-photo', [
    ])

.controller('PhotoCtrl', function ($scope, $state, $stateParams, layout, $ionicScrollDelegate, photos, $http) {
    layout.setHeaderTitle('Photo Release');
    $scope.user = { username: 'user', email: 'email' };
    if ($stateParams.id > 0) {
        console.log('sdf');
        $scope.photo = photos.get($stateParams.id);
    }
    else {
        $scope.photo = photos.get(0);
    }

    var patCanvas = document.querySelector('#snapshot');
    if (!patCanvas) return;

    //patCanvas.width = _video.width;
    //patCanvas.height = _video.height;
    var ctxPat = patCanvas.getContext('2d');

    //var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
    var image = new Image();
    image.src = $scope.photo.data;
    ctxPat.drawImage(image, 0, 0);

    //patData = idata;

    $scope.savePhoto = function () {
        $http.post('/user/create', {
            username: $scope.user.username,
            email: $scope.user.email
        }).then(function (success) {
            var userid = success.data.id;
            console.log(success);
            console.log($scope.photo.data);
            $http.post('/image/create', {
                userid: userid,
                data: $scope.photo.data,
                permissions: 'test'
            });
        }, function (failure) {
        });
    };
})
;