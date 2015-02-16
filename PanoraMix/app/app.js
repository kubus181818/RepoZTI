'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'myApp.version',
    'myApp.mainView',
    'ngAnimate'
]).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("");
});
