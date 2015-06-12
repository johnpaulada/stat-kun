(function(angular) {
	angular.module('statkun').config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/menu');

  		$stateProvider.state('menu', {
    		url: '/menu',
    		templateUrl: 'templates/menu.html'
  		});
		  
		$stateProvider.state('ind-t', {
    		url: '/ind-t',
    		templateUrl: 'templates/ind.t.html'
  		});
	});
})(window.angular);