angular
  .module('CrimeZone')
  .factory('JenisService', JenisService);

JenisService.$inject = ['$http', '$q'];

var urlJenis = 'https://apicrimezone.herokuapp.com/jenis';

function JenisService($http, $q) {
    return {
      getAllData: getAllData,
      getData: getData,
      postDataJenis: postDataJenis,
      updateJenis: updateJenis,
      deleteJenis: deleteJenis,
    };

    function getAllData() {
      var def = $q.defer();

      return $http.get(urlJenis)
      .success(getDataJenis)
      .error(errorDataJenis);

      function getDataJenis(response) {
        def.resolve(response);
      }

      function errorDataJenis() {
        def.reject('Gagal ambil data jenis');
      }

      return def.promise;

    }

    function getData(id) {
      var def = $q.defer();

      return $http.get(urlJenis + '/' + id)
      .success(getDataJenis)
      .error(errorDataJenis);

      function getDataJenis(response) {
        def.resolve(response);
      }

      function errorDataJenis() {
        def.reject('Gagal ambil data jenis');
      }

      return def.promise;

    }

    function postDataJenis(data) {
      return $http({
                url: urlJenis,
                method: 'POST',
                data: data,
              }).success(postDataJenis);

      function postDataJenis(response) {
        console.log(response);
        return response;
      }
    }

    function updateJenis(data) {
      return $http({
                url: urlJenis,
                method: 'PUT',
                data: data,
              }).success(updateDataJenis);

      function updateDataJenis(response) {
        console.log(response);
        return response;
      }
    }

    function deleteJenis(id) {
      return $http({
        url: urlJenis + '/' + id,
        method: 'DELETE',
      });
    }
  }
