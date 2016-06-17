angular
  .module('CrimeZone')
  .controller('AdminCtrl', AdminCtrl);

AdminCtrl.$inject = ['$state']
function AdminCtrl($state) {
    var vm = this;

    vm.name = window.localStorage.getItem('fullname');
    vm.logout = logout;

    function logout() {
      window.localStorage.clear();
      $state.go('login');
    }
  }
