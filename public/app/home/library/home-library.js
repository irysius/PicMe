'use strict';

angular.module('home-library', [
    ])

.controller('LibraryCtrl', function($scope, $http, $state, $stateParams, layout, $ionicScrollDelegate, photos) {
    layout.setHeaderTitle('Photo Library');

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

.controller('PhotoDetailCtrl', function($scope, $http, $state, $stateParams, layout, $ionicScrollDelegate, photos) {
    layout.setHeaderTitle('Photo Detail');

    //$scope.photo = photos.getFromDb($stateParams.id);
    $scope.photo = photos.get($stateParams.id);
    console.log('photo' + $scope.photo.permission.one);

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