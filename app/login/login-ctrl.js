angular
  .module('CrimeZone')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['LoginService', '$state', 'SweetAlert'];
function LoginCtrl(LoginService, $state, SweetAlert) {
    var vm = this;

    vm.login = login;
    function login(data) {
      console.log(data);
      LoginService.postDataLogin(data).success(function (response, status) {
        console.log(response);
        window.response = response;
        console.log(response.email);

        if (status === 200) {
          window.localStorage.setItem('email', response.response.email);
          window.localStorage.setItem('fullname', response.response.fullname);
          window.localStorage.setItem('idRole', response.response.idRole);
          window.localStorage.setItem('idWilayah', response.response.idWilayah);
          window.localStorage.setItem('id', response.response.id);
          if (response.response.idRole == 2) {
            $state.go('petugas.laporankejahatan-statistik');
          } else if (response.response.idRole == 3) {
            $state.go('admin.laporankejahatan-statistik');
          }
        }
      }).error(function (data, status) {
        console.log(data, status)
        if(status = 404){
          SweetAlert.swal("Oops...", "Wrong Email or Password", "error");
        }
      });
    }

  }
