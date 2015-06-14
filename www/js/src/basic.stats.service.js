(function(angular) {
	angular.module('jpa.js.ng.stats').factory('BasicStats', [BasicStats]);
	
	/**
	 * Service containing basic statistical procedures.
	 * 
	 * @returns {Object}
	 */
	function BasicStats() {
		
		return {
			getN:	 	 _getN,
			getDF:	 	 _getDF,
			getSum:	 	 _getSum,
			getMean: 	 _getMean,
			getSD:	 	 _getSD,
			getVariance: _getVariance
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

		/**
		 * Gets the sum of the squares of each value in the data set. 
		 *
		 * @param 	{Array} data
		 * @returns {Number}
		 */
		function _getSquaresSum(data) {
			var sum = 0, i;
			
			for (i = 0; i < data.length; i++) {
				sum += Math.pow(data[i], 2);
			}

			return sum;
		}
		
		/**
		 * Gets the sum of all x*y in two data sets.
		 * Assumes that they have the same length.
		 * 
		 * @param 	{Array} dataX - dataset of variable x
		 * @param 	{Array} dataY - dataset of variable y
		 * @returns {Number}
		 */
		function _getXYSum(dataX, dataY) {
			var sum = 0, i;
			
			for (i = 0; i < dataX.length; i++) {
				sum += dataX[i] * dataY[i];
			}
			
			return sum;
		}
		
		/**
		 * Gets the number of samples in the data set.
		 * 
		 * @param 	{Array} data
		 * @returns {Number}
		 */
		function _getN(data) {
			return data.length;
		}
		
		/**
		 * Gets the degrees of freedom of the data set.
		 * 
		 * @param 	{Array} data
		 * @returns {Number}
		 */
		function _getDF(data) {
			return _getN(data) - 1;
		}
		
		/**
		 * Gets the sum of squares of a single data set.
		 * @param 	{Array} data
		 * @returns {Number}
		 */
		function _getSS(data) {
			return _getSquaresSum(data) - (Math.pow(_getSum(data), 2) / _getN(data));
		}
		
		/**
		 * Gets the combined sum of squares of two data sets.
		 * @param 	{Array} dataX
		 * @param 	{Array} dataY
		 * @returns {Number}
		 */
		function _getSSXY(dataX, dataY) {
			return _getXYSum(dataX, dataY) - ((_getSum(dataX)*_getSum(dataY)) / _getN(dataX));
		}
		
		function _getSD(data) {
			return Math.sqrt(_getVariance(data));
		}
		
		function _getVariance(data) {
			return _getSS(data) / _getDF(data);
		}
	}
})(window.angular);