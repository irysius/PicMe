'use strict';

angular.module('home', [
	'home-library',
	'home-photo'
])
.controller('HomeCtrl', function($scope, $state, layout, $ionicScrollDelegate, photos) {
    layout.setHeaderTitle('Home');

    var _video = null,
    	patData = null;
	
    $scope.goToAccept = function() {
        var patCanvas = document.querySelector('#snapshot');
    	var pngBase64 = patCanvas.toDataURL("image/png");        
        photos.add(pngBase64);
        $state.go('home.photo');
    };

	$scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    $scope.onSuccess = function (videoElem) {
        // The video element contains the captured camera data
        _video = videoElem;
        $scope.$apply(function() {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            $scope.showDemos = true;
        });
    };

    $scope.makeSnapshot = function makeSnapshot() {
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            patData = idata;
            console.log(idata);
        }
    };

    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };
})
;
