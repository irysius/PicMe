'use strict';

angular.module('home-photo', [
    ])

.controller('PhotoCtrl', function ($scope, $state, $stateParams, layout, $ionicScrollDelegate, $ionicModal, photos, $http) {
    layout.setHeaderTitle('Photo Release');
    $scope.physicianid = 3001;
    $scope.user = { username: '', email: '' };
    $scope.permissions = { one: false, two: false, three: false, four: false };
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
            var _permissions = '';
            _permissions += $scope.permission.one ? '1' : '0';
            _permissions += $scope.permission.two ? '1' : '0';
            _permissions += $scope.permission.three ? '1' : '0';
            _permissions += $scope.permission.four ? '1' : '0';
            $http.post('/image/create', {
                physicianid: $scope.physicianid,
                userid: userid,
                data: $scope.photo.data,
                permissions: _permissions
            }).then(function (success) {
                $scope.showModal();
            });
        }, function (failure) {
        });
    };


    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('app/home/photo/confirmedmodal.html', function(modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-top'
    });
      
    $scope.showModal = function(item) {
        if (!$scope.modal) return;
        
        $scope.modal.scope.item = item;
    
        $scope.modal.scope.closeModal = function () {
            $scope.modal.hide();
        };

        $scope.modal.show();
    };
    
    $scope.$on('$destroy', function()
    {
       $scope.modal.remove();
    });    
})
;