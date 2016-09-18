
var swdnP2App = swdnP2App || {};
var controllers = swdnP2App.controllers = angular.module('swdnP2AppControllers', ['ui.bootstrap']);

controllers.controller('TopnavCtrl', ['$scope', function ($scope) {
	$scope.hello = "hello";
}])