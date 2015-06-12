(function(angular) {
	angular.module('statkun').controller("MenuController", ['$scope', MenuController]);
	
	/**
	 * Manages the Menu
	 * 
	 * @params {Object} $scope
	 * @returns {undefined}
	 */
	function MenuController($scope) {
		
		// Initialize
		$scope.menuItems = _getMenuItems();
		
		/**
		 * Retrieves the menu items.
		 */
		function _getMenuItems() {
			return [
				{
					name: 'Independent Samples t-test',
					url:  '#/ind-t'
				},
				
				{
					name: 'Repeated Samples t-test',
					url:  '#/rel-t'
				}
			];
		}
	}
})(window.angular);