'use strict';

var app = angular.module('swdnP2App', ['swdnP2AppControllers', 'ngRoute', 'ui.bootstrap']);

/* routing configuration for production */
var routeConfig = function($routeProvider) {
    $routeProvider.when('/events', {
        templateUrl: '/views/events.html',
        controller: 'EventController'
    });
    $routeProvider.when('/create_event', {
        templateUrl: '/views/create_event.html',
        controller: 'EventController'
    });
    $routeProvider.when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController'
    });
    $routeProvider.when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'SignupController'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
};

/* 
 * using the $inject property so that this file will minify properly. without this method of injecting $routeProvider the routeConfig
 * would generate an error saying $routeProvider is undefined and will be unable to load in any templates
 * I'm also happy I had to fix this error because now I know how to manually inject dpendencies in angular. Yay! #Winning
 * From now on this is how I'm going to implement my controllers in the future by inject dependencies manually for successful minification
*/ 
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
