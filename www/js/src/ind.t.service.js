(function(angular) {
	angular.module('jpa.js.ng.stats').factory('IndependentT', ['BasicStats', IndependentT]);
	
	/**
	 * Service containing logical operations for Independent Samples t-test.
	 * 
	 * @returns {Object}
	 */
	function IndependentT(BasicStats) {
		return {
			getT: 	 _getT,
			compute: _compute
		};
		
		function _getPooledVariance(dataX, dataY) {
			var numerator, denominator,
				dfX = BasicStats.getDF(dataX),
				dfY = BasicStats.getDF(dataY);
			
			numerator   = (dfX * BasicStats.getVariance(dataX)) + (dfY * BasicStats.getVariance(dataY));
			denominator = dfX + dfY;
			
			return numerator / denominator;
		}
		
		function _getDF(dataX, dataY) {
			return BasicStats.getDF(dataX) + BasicStats.getDF(dataY);
		}
		
		function _getT(dataX, dataY) {
			return (BasicStats.getMean(dataX) - BasicStats.getMean(dataY)) / _getStandardError(dataX, dataY);
		}
		
		function _getStandardError(dataX, dataY) {
			var pooledVariance = _getPooledVariance(dataX, dataY);
			
			return Math.sqrt((pooledVariance / BasicStats.getN(dataX)) + (pooledVariance / BasicStats.getN(dataY)));
		}
		
		function _getSignificance(dataX, dataY) {
			return Math.abs(_getT(dataX, dataY)) > _getTTable()['0.05'][_getDF(dataX, dataY)];
		}
		
		function _compute(dataX, dataY) {
			return {
				tCalc: _getT(dataX, dataY),
				tCrit: _getTTable()['0.05'][_getDF(dataX, dataY)],
				sig:   _getSignificance(dataX, dataY),
				df:	   _getDF(dataX, dataY),
				se:	   _getStandardError(dataX, dataY),
				xStats: {
					mean: BasicStats.getMean(dataX),
					sd:   BasicStats.getSD(dataX),
					df:	  BasicStats.getDF(dataX)
				},
				yStats: {
					mean: BasicStats.getMean(dataY),
					sd:   BasicStats.getSD(dataY),
					df:	  BasicStats.getDF(dataY)
				}
			};
		}
		
		function _getTTable() {
			return {
				'0.05': {
					'1': 12.706,
					'2': 4.303,
					'3': 3.182,
					'4': 2.776,
					'5': 2.571,
					'6': 2.447,
					'7': 2.365,
					'8': 2.306,
					'9': 2.262,
					'10': 2.228,
					'11': 2.201,
					'12': 2.179,
					'13': 2.160,
					'14': 2.145,
					'15': 2.131,
					'16': 2.120,
					'17': 2.110,
					'18': 2.101,
					'19': 2.093,
					'20': 2.086,
					'21': 2.080,
					'22': 2.074,
					'23': 2.069,
					'24': 2.064,
					'25': 2.060,
					'26': 2.056,
					'27': 2.052,
					'28': 2.048,
					'29': 2.045,
					'30': 2.042,
					'40': 2.021,
					'60': 2.000,
					'120': 1.980,
					'Infinity': 1.960
				}
			};
		}
	}
})(window.angular);