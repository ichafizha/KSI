angular
  .module('CrimeZone')
  .factory('PenggunaService', PenggunaService);

PenggunaService.$inject = ['$http', '$q'];

var urlPengguna = 'https://apicrimezone.herokuapp.com/pengguna';

function PenggunaService($http, $q) {
    return {
      getAllData: getAllData,
      deletePengguna: deletePengguna,
    };

    function getAllData() {
      var def = $q.defer();

      return $http.get(urlPengguna)
        .success(getDataPengguna)
        .error(errorDataPengguna);

      function getDataPengguna(response) {
        def.resolve(response);
      }

      function errorDataPengguna() {
        def.reject('Tidak bisa mengambil data pengguna');
      }

      return def.promise;

    }
    function deletePengguna(id) {
      return $http({
        url: urlPengguna + '/' +id,
        method: 'DELETE',
      })
    }
  }
