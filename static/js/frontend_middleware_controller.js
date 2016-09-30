controllers.controller('FrontEndMiddlewareCtrl', ['$scope', function ($scope) {
	
	$scope.testEndpoint = function() {
		var request = gapi.client.frontend_middleware_endpoint.frontend_middleware_endpoint_test({txt: "middleware_endpoint"});
		request.execute(function(response) {
			log(response);
		});
	};

	$scope.registerServiceWorker = function() {
		log(navigator.serviceWorker);
	};

}])