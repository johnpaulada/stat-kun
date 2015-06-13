(function(angular) {
	angular.module('statkun').controller("IndTController", ['$scope', 'BasicStats', IndTController]);
	
	/**
	 * Controls the Independent Samples t-test process
	 * 
	 * @params {Object} $scope
	 * @returns {undefined}
	 */
	function IndTController($scope, BasicStats) {
		
		// Initialize
		$scope.dataset = [];
		$scope.add = _addToDataset;
		
		function _addToDataset(beforeData, afterData) {
			$scope.dataset.push({
				'before': beforeData,
				'after':  afterData
			});
			
			window.alert(BasicStats.getSum([1, 2, 3]));
		}
	}
})(window.angular);