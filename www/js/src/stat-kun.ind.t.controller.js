(function(angular) {
	angular.module('statkun').controller("IndTController", ['$scope', 'IndependentT', IndTController]);
	
	/**
	 * Controls the Independent Samples t-test process
	 * 
	 * @params  {Object} $scope
	 * @returns {undefined}
	 */
	function IndTController($scope, IndependentT) {
		
		// Initialize
		$scope.dataset = [];
		$scope.add 	   = _addToDataset;
		$scope.compute = _compute;
		
		function _addToDataset(experimentData, controlData) {
			$scope.dataset.push({
				'experimental': parseInt(experimentData, 10),
				'control':  parseInt(controlData, 10)
			});
		}
		
		function _compute() {
			var experimentData = [], controlData = [], conclusion, summary = {}, i;
			
			for (i = 0; i < $scope.dataset.length; i++) {
				experimentData[i] = $scope.dataset[i].experimental;
				controlData[i] = $scope.dataset[i].control;
			}
			
			$scope.results = IndependentT.compute(experimentData, controlData);
			
			summary.x = 'Experimental group: M = ' + $scope.results.xStats.mean + ', SD = ' + $scope.results.xStats.sd;
			summary.y = 'Experimental group: M = ' + $scope.results.yStats.mean + ', SD = ' + $scope.results.yStats.sd;
			
			conclusion = 'The difference between the two groups is ' + ($scope.results.sig ? '' : 'not') + 'significant t(' + $scope.results.df + ') = ' + $scope.results.tCalc + ', p ' + ($scope.results.sig ? '<' : '>') + ' 0.05.';
		}
	}
})(window.angular);