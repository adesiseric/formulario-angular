'use strict';

(function () {

    function config ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/form.html',
        })
        .when('/notFound', {
            templateUrl: '404.html'
        })
        .otherwise({
            redirectTo: '/notFound'
        });
    }

    angular.module('formsAngularApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.utils',
        'commonDirectives',
        'commonControllers'
    ]).config(config);

})();