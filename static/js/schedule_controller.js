controllers.controller('ScheduleCtrl', ['$scope', function ($scope) {

	$scope.testEndpoint = function() {
		var request = gapi.client.schedule_endpoint.sechedule_endpoint_test({txt: "schedule_endpoint"});
		request.execute(function(response) {
			log(response);
		});
	};

	// $scope.loadingInterval;
	// $scope.currentColumn;
	// $scope.currentTrain;
	// $scope.scheduleData;

	// $scope.loadTrainObjects = function(func) {

	// 	var request;
	// 	$scope.loadingInterval = window.setInterval(function() {
	// 		$scope.clearTrainList();
	// 		request = gapi.client.train_manager_endpoint.getTrainObjects();
	// 		$scope.execute(request);
	// 	}, 20000);
	// };

	// $scope.execute = function(request) {
	// 	var newTrain;
	// 	request.execute(function(response){
	// 		response.train_list.forEach( function(train, index) {
	// 			newTrain = $scope.createTrainHtml();
	// 			$scope.addTrain(newTrain);
	// 		});
	// 	});
	// };

	// $scope.loadCitiesCountries = function() {
	// 	jQuery.getJSON( "/schedule_json", function( data ) {
	// 		$scope.scheduleData = data;
	// 		log($scope.scheduleData);
	// 	});
	// };

	// $scope.addToLocalStorage= function() {

	// };

	// $scope.clearInterval = function() {
	// 	clearInterval($scope.loadingInterval);
	// };

	// $scope.clearTrainList = function() {
	// 	jQuery("#schedule-row").empty();
	// }

	// $scope.addTrain = function(train) {
	// 	jQuery("#schedule-row").append(train);
	// };

	// $scope.createTrainHtml = function() {
	// 	$scope.currentColumn = document.createElement("div");
	// 	$scope.currentTrain = document.createElement("div");
	// 	$scope.currentColumn.className = "col-xs-3";
	// 	$scope.currentTrain.className = "train-object";
	// 	$scope.currentTrain.innerHTML = "<h1>'{{sup}}'</h1>"
	// 	$scope.currentColumn.appendChild($scope.currentTrain);
	// 	return $scope.currentColumn;
	// };

	// $scope.loadCitiesCountries();
}])
