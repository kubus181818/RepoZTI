'use strict';

angular.module('myApp.mainView', [])
.controller('carousel', function($scope)
{
    $scope.slides = [
        {
            image: 'http://placehold.it/1900x1080&text=Slide One'
        },
        {
            image: 'http://placehold.it/1900x1080&text=Slide Two'
        },
        {
            image: 'http://placehold.it/1900x1080&text=Slide Three'
        }
    ];

    $scope.currentIndex = 0;
    $scope.setCurrentSlide = function(index){
        $scope.currentIndex = index;
    }
    $scope.isCurrentIndex = function(index){
        return $scope.currentIndex === index;
    }
});