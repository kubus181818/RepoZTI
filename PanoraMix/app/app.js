'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('panoramix', [
    'ui.router',
    'myApp.version',
    'ui.bootstrap'
]).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('state1', {
            url: "/state1",
            templateUrl: "state1/state1.html"
        });
});