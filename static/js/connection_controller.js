controllers.controller('ConnectionCtrl', ['$scope', function ($scope) {

	$scope.hello = "hello";

	$scope.startConnectionStatus = function() {
		log("starting connection status");
	};

	$scope.testEndpoint = function() {
		var request = gapi.client.connection_endpoint.connection_endpoint_test({txt: "connection_endpoint"})
		request.execute(function(response) {
			log(response);
		});
	};
}])