angular
  .module('CrimeZone')
  .factory('LoginService', LoginService);

LoginService.$inject = ['$http', '$q'];

var urlLogin = 'https://apicrimezone.herokuapp.com/petugas/login';

function LoginService($http, $q) {
    return {
      postDataLogin: postDataLogin,
    };

    function postDataLogin(data) {
      return $http({
                url: urlLogin,
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                data: data,
              }).success(postDataLogin);

      function postDataLogin(response) {
        return response;
      }
    }
  }
