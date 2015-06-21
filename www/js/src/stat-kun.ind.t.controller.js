(function(angular) {
	angular.module('statkun').controller("IndTController", ['$scope', '$ionicModal', 'IndependentT', IndTController]);
	
	/**
	 * Controls the Independent Samples t-test process
	 * 
	 * @params  {Object} $scope
	 * @returns {undefined}
	 */
	function IndTController($scope, $ionicModal, IndependentT) {
		
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
			
			$scope.modalTitle = 'Results!';
			$scope.modalContent = conclusion;
			$scope.openModal();
		}
		
		$ionicModal.fromTemplateUrl('my-modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal) {
		    $scope.modal = modal;
		});
		  
		$scope.openModal = function() {
			$scope.modal.show();
		};
		
		$scope.closeModal = function() {
		    $scope.modal.hide();
		};
		
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
		    $scope.modal.remove();
		});
		
		// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
		    // Execute action
		});
		  
		// Execute action on remove modal
		$scope.$on('modal.removed', function() {
		  // Execute action
		});
	}
})(window.angular);