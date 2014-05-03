'use strict';

angular.module('home-library', [
    ])

.controller('LibraryCtrl', function($scope, $http, $state, $stateParams, layout, $ionicScrollDelegate, photos) {
    layout.setHeaderTitle('Photo Library');

	$scope.photos = photos.photos;

    $scope.photos = getData(); 

	function getData() {
        var a = [];
        for (var i=1; i< 20; i++) {
            a.push(i);
        }
            
        return a;
      }


	$scope.moreDataCanBeLoaded = true;

	$scope.loadMoreData = function() {
  	    //$http.get('/more-items').success(function(items) {

			//for(var i=0, l=items.length; i < l; i++) {
			//	$scope.photos.push(items[i]);
			//}
console.log('currentsize:' + $scope.photos.length);

			for(var i= ($scope.photos.length + 1), l = $scope.photos.length; i < (l + 10); i++) {
console.log('dfsdfsf:' + $scope.photos.length + '   ' + i);
				$scope.photos.push(i);
			}

		    if ($scope.photos.length > 30) {
		      	$scope.moreDataCanBeLoaded = false;
		    }

console.log('currentsize2:' + $scope.photos.length);
	    	$scope.$broadcast('scroll.infiniteScrollComplete');
	    //});

	};

	$scope.$on('stateChangeSuccess', function() {
	    //$scope.loadMoreData();
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