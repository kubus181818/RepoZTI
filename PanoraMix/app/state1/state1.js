'use strict';

myApp.controller('CarouselDemoCtrl', function ($scope) {
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


});
myApp.controller('LoginModal', function ($scope, $modal, $log) {

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
        console.log("logout");
        firebase.unauth();
    }
});
myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, $location, $rootScope) {

    $scope.flag=true;
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
        console.log("AFTER?");

        function authHandler(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                $scope.flag = false;
                $scope.error = error;
                console.log("FLAG:", $scope.flag);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $scope.flag = true;
                $modalInstance.close();
            }
        }
    }



    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


myApp.factory("loginFactory", function ($http, $location) {
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
