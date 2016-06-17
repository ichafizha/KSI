angular
  .module('CrimeZone')
  .controller('PetugasCtrl', PetugasCtrl);

PetugasCtrl.$inject = ['$state']
function PetugasCtrl($state) {
    var vm = this;

    vm.name = window.localStorage.getItem('fullname');
    vm.logout = logout;

    function logout() {
      window.localStorage.clear();
      $state.go('login');
    }
  }
