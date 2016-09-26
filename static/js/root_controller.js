
var swdnP2App = swdnP2App || {};
var controllers = swdnP2App.controllers = angular.module('swdnP2AppControllers', ['ngRoute']);

controllers.controller('TopnavCtrl', ['$scope', function ($scope) {

	$scope.log_info = function() {
		log("topnav controller loaded");
	};

	$scope.log_info();
}])

controllers.controller('RootCtrl', ['$scope', function ($scope) {
	
	$scope.log_info = function() {
		log("root controller loaded");
	};

	$scope.log_info();

}])