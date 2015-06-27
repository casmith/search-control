(function() {
	var app = angular.module('app', ['ngSanitize']);

	app.directive('searchControl', function() {

		var sourceText = '<p>It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem,  the entire nervous system has been depleted of electrochemical energy. Any device like that would produce high levels of triolic waves. These walls have undergone some kind of selective molecular polarization. I haven\'t determined if our phaser energy can generate a stable field. We could alter the photons with phase discriminators.</p><p>Deflector power at maximum. Energy discharge in six seconds. Warp reactor core primary coolant failure. Fluctuate phaser resonance frequencies. Resistance is futile. Recommend we adjust shield harmonics to the upper EM band when proceeding. These appear to be some kind of power-wave-guide conduits which allow them to work collectively as they perform ship functions. Increase deflector modulation to upper frequency band.</p><p>Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.</p><p>Unidentified vessel travelling at sub warp speed, bearing 235.7. Fluctuations in energy readings from it, Captain. All transporters off. A strange set-up, but I\'d say the graviton generator is depolarized. The dark colourings of the scrapes are the leavings of natural rubber, a type of non-conductive sole used by researchers experimenting with electricity. The molecules must have been partly de-phased by the anyon beam.</p>';

		return {
			restrict: 'EA',
			scope: {},
			replace: true,
			templateUrl: 'search.html',
			controller: ['$scope', '$timeout', function($scope, $timeout) {

				$scope.updateSearchResults = function(e) {
					
					if ($scope.searchString) {
						// highlight all of the results
						$scope.searchResults = sourceText.replace(new RegExp($scope.searchString, 'gi'), function(hit) {
							return '<span class="highlight">' + hit + '</span>';
						});
						
						// set the current result
						if (e && e.keyCode !== 13) {
							// user modified search terms, always select the first result
							$scope.currentHit = 0;
						} else {
							// user pressed enter to go to the next search result. 
							// wrap around if they hit the last result
							if ($scope.currentHit++ === $scope.count - 1) {
						    	$scope.currentHit = 0;
						    }
						}

						$timeout(function() {
							$scope.count = $('#searchResults').find('.highlight').size();	
						});
						
						var highlighted = $('#searchResults').find('.highlight');
						// remove highlighting for current hit
						highlighted.removeClass('currentHit');

						if ($scope.count) {
							// find the new currentHit and mark it
							var hit = $(highlighted.toArray()[$scope.currentHit]);
							$timeout(function() {
								hit.addClass('currentHit');
							}, 30)
							
							// then scroll to it
							$('#searchResults').animate({
						        scrollTop: hit.offset().top - $('#searchResults').offset().top
						    }, 0);
						}
					} else {
						$scope.searchResults = sourceText;		
						$scope.count = 0;
						hitIndex = 0;
					}	
				}
				$scope.updateSearchResults();		
				
			}]
		};
	}) 

})();	