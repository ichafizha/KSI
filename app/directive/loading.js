angular
  .module('CrimeZone')

  .directive('loading', loading);

  loading.$inject = ['$state']
  function loading($state) {
    return {
      restrict: 'E',
      templateUrl: 'app/directive/loading.html'
    }
  }