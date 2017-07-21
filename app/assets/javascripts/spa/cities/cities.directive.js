(function() {
    'use strict';

    angular
        .module('spa.cities')
        .directive('sdCities', CitiesDirective);

    CitiesDirective.$inject = ['spa.APP_CONFIG'];

    /* @ngInject */
    function CitiesDirective(APP_CONFIG) {
        var directive = {
            templateUrl: APP_CONFIG.cities_html,
            replace: true,
            bindToController: true,
            controller: 'spa.cities.CitiesController',
            controllerAs: 'citiesVM',
            link: link,
            restrict: 'E',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
            console.log('CitiesDirective', scope)
        }
    }

})();