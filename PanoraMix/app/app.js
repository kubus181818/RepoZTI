'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('panoramix', [
    'ui.router',
    'myApp.version',
    'ui.bootstrap',
    'firebase'
]).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('state1', {
            url: "/state1",
            templateUrl: "state1/state1.html"
            //,
            //resolve:{
            //    authentication:function(){
            //        var firebase = new Firebase("https://panoramix.firebaseio.com/");
            //
            //        var authData = firebase.getAuth();
            //        if (authData) {
            //            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            //        } else {
            //            $location.path("#");
            //            console.log("User is logged out");
            //        }
            //    }
            //}
        }).state('mainState', {
            url: "/mainState",
            templateUrl: "mainState/mainState.html"
        });
})
    .run(function($state, $rootScope){
        var firebase = new Firebase("https://panoramix.firebaseio.com/");

        var authData = firebase.getAuth();
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            $state.go("state1");
            $rootScope.flag = true;
        } else {
            $state.go("mainState")
            console.log("User is logged out");
        }
    })
    .controller('CarouselDemoCtrl', function ($scope) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function () {
            slides.push({
                image: 'http://placehold.it/1900x1080&text=Slide One',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
            $scope.posiotion = i;
        }


    })
    .controller('LoginModal', function ($scope, $modal, $log, $state, $rootScope) {

        //$scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });


        };
        $scope.logout = function () {
            var firebase = new Firebase("https://panoramix.firebaseio.com/");
            $rootScope.flag = false;
            firebase.unauth();
            $state.go("mainState")
        }
    })
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, $location, $rootScope) {
        console.log($scope.flag);
        $scope.user = {};
        $scope.ok = function () {
            console.log($scope.user);
            login();
        };

        function login(){
            var firebase = new Firebase("https://panoramix.firebaseio.com/");
            console.log("IN REGISTER");
            firebase.authWithPassword({
                email: $scope.user.email,
                password: $scope.user.password
            }, authHandler);

            function authHandler(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $rootScope.flag = false;
                    $scope.error = true;
                    $scope.error = error;
                    console.log("FLAG:", $rootScope.flag);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $rootScope.flag = true;
                    $scope.error = false;
                    $location.path("/state1");
                    console.log("FLAG", $rootScope.flag);
                    $modalInstance.close();
                }
            }
        }



        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .factory("loginFactory", function ($http, $location) {
        //var firebase = new Firebase("https://panoramix.firebaseio.com/");
        //var factory = {};
        //
        //factory.register = function (user) {
        //    console.log("IN REGISTER");
        //    firebase.authWithPassword({
        //        email: user.email,
        //        password: user.password
        //    }, authHandler);
        //    console.log("AFTER?");
        //}
        //function authHandler(error, authData) {
        //    if (error) {
        //        console.log("Login Failed!", error);
        //        return true;
        //    } else {
        //        console.log("Authenticated successfully with payload:", authData);
        //        $location.path('/view1');
        //        $("#loginModal").modal('hide');
        //        return false;
        //    }
        //}

        //factory.logout = function () {
        //    console.log("logout");
        //    ref.unauth();
        //    $rootScope.flag = true;
        //}
        //   return factory;

    });