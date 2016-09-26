'use strict';

var app = angular.module('swdnP2App', ['swdnP2AppControllers', 'ngRoute']);

/* routing configuration for production */
var routeConfig = function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
    });
    $routeProvider.when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'SignupCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
};

routeConfig.$inject = ["$routeProvider"];
app.config(routeConfig);

app.filter('startFrom', function () {
    var filter = function (data, start) {
        return data.slice(start);
    };
    return filter;
});

app.constant('HTTP_ERRORS', {
    'UNAUTHORIZED': 401,
    'test': 503 
});
