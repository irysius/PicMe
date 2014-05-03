'use strict';

var app = angular.module('picme', [
    'ionic',
    'webcam',
    'layout',
    'photos',
    'home'
 ])
.controller('IndexCtrl', function($scope, layout, $ionicModal, $ionicSideMenuDelegate, photos) {//, jsonDataContacts, contacts, jsonDataPresentations, presentations) {
    photos.photos = [];
    
    //presentations.presentations = jsonDataPresentations;

    $scope.layout = layout;

    $scope.showMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $ionicModal.fromTemplateUrl('menumodal.html', function(modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-left'
    });
      
    $scope.showModal = function(item) {
        if (!$scope.modal) return;
        
        $scope.modal.scope.item = item;
        $scope.modal.show();
    };
    
    $scope.$on('$destroy', function()
    {
       $scope.modal.remove();
    });   
})
.controller('ModalCtrl', function($scope) {
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
})


.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/index.html',
            controller: 'HomeCtrl'
        })
        .state('home.photo', {
            url: '/photo',
            views: {
                'mainContent': {
                    templateUrl: 'app/home/photo/accept.html',
                    controller: 'PhotoCtrl'
                }
            }
        })

        .state('relate', {
            url: '/relate',
            templateUrl: 'app/relate/index.html'
        })
        .state('relate.contact', {
            url: '/contact/:id',
            views: {
                'mainContent': {
                    templateUrl: 'app/relate/contact/detail.html',
                    controller: 'ContactCtrl'
                }
            }
        })
        .state('relate.conversation', {
            url: '/conversation/:conversation_id?contact_id',
            views: {
                'mainContent': {
                    templateUrl: 'app/relate/contact/conversation.html',
                    controller: 'ConversationCtrl'
                }
            }
        });
        
        $urlRouterProvider.otherwise("/");
        
        $locationProvider.html5Mode(true);
})

.filter('getById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  };
})
;

//Load all data from the json file before bootstrapping the app.
angular.element(document).ready(
    function() {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get('$http');
        // $http.get('assets/data/contacts.js').then(
        // function(response) {
        //     app.constant('jsonDataContacts', response.data);

        //     $http.get('assets/data/presentations.js').then(
        //         function(response2) {
        //             app.constant('jsonDataPresentations', response2.data);
                    angular.bootstrap(document, ['picme']);
            //     }
            // );
        //}
    //);
	}
);
