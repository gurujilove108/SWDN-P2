controllers.controller("LoginCtrl", ["$scope", function($scope) {

	$scope.testEndpoint = function() {
		var request = gapi.client.login_endpoint.login_endpoint_test({txt: "login_endpoint"});
		request.execute(function(response) {
			log(response);
		});
	};
}])