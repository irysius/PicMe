'use strict';

angular.module('home-library', [
    ])

.controller('LibraryCtrl', function($scope, $http, $state, $stateParams, layout, $ionicScrollDelegate, photos) {
    layout.setHeaderTitle('Photo Library');

    photos.clear();
	$scope.photos = photos.getAll();

    //$scope.photos.getData(); 

	//function getData() {
        //var a = [];

        

       // return a;
      //}


	$scope.moreDataCanBeLoaded = false;

	$scope.loadMoreData = function() {
  	    //$http.get('/more-items').success(function(items) {

			//for(var i=0, l=items.length; i < l; i++) {
			//	$scope.photos.push(items[i]);
			//}

			for(var i= ($scope.photos.length + 1), l = $scope.photos.length; i < (l + 10); i++) {
				$scope.photos.push(i);
			}

		    if ($scope.photos.length > 30) {
		      	$scope.moreDataCanBeLoaded = false;
		    }

	    	$scope.$broadcast('scroll.infiniteScrollComplete');
	    //});

	};

	$scope.loadPhoto = function(photo) {
        $scope.selectedId = photo.id;
        $state.go('home.photoDetail', {'id' : photo.id});
    };

	$scope.$on('stateChangeSuccess', function() {
	    //$scope.loadMoreData();
	});
})

.controller('PhotoDetailCtrl', function($scope, $http, $state, $stateParams, layout, $ionicScrollDelegate, $ionicModal, photos) {
    layout.setHeaderTitle('Photo Detail');

    //$scope.photo = photos.getFromDb($stateParams.id);
    $scope.photo = photos.get($stateParams.id);
    $scope.data = {
      permissions: '0000'
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('app/home/library/downloadmodal.html', function(modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-top'
    });
      
    $scope.showModal = function(item) {
        if (!$scope.modal) return;
        
        $scope.modal.scope.item = item;

        $scope.modal.scope.photo = $scope.photo;
        $scope.modal.scope.imagefile = $scope.photo.data.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        $scope.modal.scope.data = $scope.data;

        $scope.modal.scope.logUsage = function() {
          console.log('inusage');
          $http.post('/usage/create', {
              userid: 1,
              imageid: $scope.photo.id,
              permissions: $scope.data.permissions
            }).then(function (success) {
                $scope.modal.hide();
              }, function (failure) {
            });
        }
        $scope.modal.scope.emailImage = function () {
          console.log('inemailimage');
          $http.post('/usage/create', {
              userid: 1,
              imageid: $scope.photo.id,
              permissions: $scope.data.permissions
          })
          $http.post('/image/email', {
            email: 'lestersy@hotmail.com',
            imageid: $scope.photo.id
          }).then(function (success) {
            console.log('image emailed');
            $scope.modal.hide();
          })
        }
        
        $scope.modal.show();
    };
    
    $scope.$on('$destroy', function()
    {
       $scope.modal.remove();
    });    
})

.directive('photo', function($window) {
  return {
    restrict: 'C',
    link: function($scope, $element, $attr) {
      var size = ($window.outerWidth / 3) - 2;
      $element.css('width', size + 'px');
    }
  }
});
;