controllers.controller('SignupCtrl', ['$scope', function ($scope) {
	
	$scope.testEndpoint = function() {
		var request = gapi.client.signup_endpoint.signup_endpoint_test({txt: "signup_endpoint"})
		request.execute(function(response) {
			log(response);
		});
	};

}])
