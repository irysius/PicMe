'use strict';

angular.module('home-library', [
    ])

.controller('LibraryCtrl', function($scope, $http, $state, $stateParams, layout, $ionicScrollDelegate, photos) {
    layout.setHeaderTitle('Photo Library');

	//$scope.photos = photos.photos;

    $scope.photos = getData(); 

	function getData() {
        var a = [];

        $http.get('/image').success(function (data) {
        	console.log('data:' + data.data.length);
        	for (var i = 0; i < data.data.length; i++) {
        		var photo = { 'id': data.data[i].imageid, 'data': data.data[i].data };
            	a.push(photo);            	
        	}
        });

        return a;
      }


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