angular
  .module('CrimeZone')

  .directive('auth', auth);

  auth.$inject = ['$state']
  function auth($state) {
    return {
      restrict: 'M',
      link: function () {
        if(localStorage.getItem('email') === null){
          $state.go('login');
        } else if((localStorage.getItem('email') !== null) || (localStorage.getItem('idRole') == 3)){
          $state.go('admin.laporankejahatan-statistik');
          console.log('idrole 3');
        } else if((localStorage.getItem('email') !== null) || (localStorage.getItem('idRole') == 2)){
          $state.go('petugas.laporankejahatan-statistik');
          console.log('idrole 2');
        }
      }
    }
  }
