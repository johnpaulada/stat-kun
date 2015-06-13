(function(angular) {
	angular.module('jpa.js.ng.stats').factory('BasicStats', BasicStats);
	
	/**
	 * Service containing basic statistical procedures.
	 * 
	 * @returns {Object}
	 */
	function BasicStats() {
		
		return {
			getSum:	 _getSum,
			getMean: _getMean
		};
		
		/**
		 * Gets sum of a given data set.
		 * 
		 * @param	{Array} data
		 * @returns {Number}
		 */
		function _getSum(data) {
			var sum = 0, i;
			
			for (i = 0; i < data.length; i++) {
				sum += data[i];
			}
			
			return sum;
		}
		
		/**
		 * Gets the mean of a given data set.
		 * 
		 * @param	{Array} data
		 * @returns {Number}
		 */
		function _getMean(data) {
			return _getSum(data) / data.length;
		}
	}
})(window.angular);