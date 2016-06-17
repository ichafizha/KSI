angular
  .module('CrimeZone')
  .factory('LokasiService', LokasiService);

LokasiService.$inject = ['$http', '$q'];

var urlLokasi = 'https://apicrimezone.herokuapp.com/lokasi';

function LokasiService($http, $q) {
    return {
      getAllData: getAllData,
      getData: getData,
      postDataLokasi: postDataLokasi,
      updateLokasi: updateLokasi,
      deleteLokasi: deleteLokasi,
    };

    function getAllData() {
      var def = $q.defer();

      return $http.get(urlLokasi)
      .success(getDataLokasi)
      .error(errorDataLokasi);

      function getDataLokasi(response) {
        def.resolve(response);
      }

      function errorDataLokasi() {
        def.reject('Gagal ambil data wilayah');
      }

      return def.promise;

    }

    function getData(id) {
      var def = $q.defer();

      return $http.get(urlLokasi + '/' + id)
      .success(getDataLokasi)
      .error(errorDataLokasi);

      function getDataLokasi(response) {
        def.resolve(response);
      }

      function errorDataLokasi() {
        def.reject('Gagal ambil data lokasi');
      }
      return def.promise;
    }

    function postDataLokasi(data) {
      return $http({
                url: urlLokasi,
                method: 'POST',
                data: data,
              }).success(postDataLokasi);

      function postDataLokasi(response) {
        console.log(response);
        return response;
      }
    }

    function updateLokasi(data) {
      return $http({
                url: urlLokasi,
                method: 'PUT',
                data: data,
              }).success(updateDataLokasi);

      function updateDataLokasi(response) {
        console.log(response);
        return response;
      }
    }

    function deleteLokasi(id) {
      return $http({
        url: urlLokasi + '/' + id,
        method: 'DELETE',
      });
    }
  }
