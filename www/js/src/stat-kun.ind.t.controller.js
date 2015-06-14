(function(angular) {
	angular.module('statkun').controller("IndTController", ['$scope', 'IndependentT', IndTController]);
	
	/**
	 * Controls the Independent Samples t-test process
	 * 
	 * @params {Object} $scope
	 * @returns {undefined}
	 */
	function IndTController($scope, IndependentT) {
		
		// Initialize
		$scope.dataset = [];
		$scope.add = _addToDataset;
		
		function _addToDataset(beforeData, afterData) {
			$scope.dataset.push({
				'before': beforeData,
				'after':  afterData
			});
		}
	}
})(window.angular);