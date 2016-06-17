angular
  .module('CrimeZone')
  .factory('WilayahService', WilayahService);

WilayahService.$inject = ['$http', '$q'];

var urlWilayah = 'https://apicrimezone.herokuapp.com/wilayah';

function WilayahService($http, $q) {
    return {
      getAllData: getAllData,
      getData: getData,
      postDataWilayah: postDataWilayah,
      updateWilayah: updateWilayah,
      deleteWilayah: deleteWilayah,
    };

    // BLOCK GET ALL DATA WILAYAH KEPOLISIAN
    function getAllData() {
      var def = $q.defer();

      return $http.get(urlWilayah)
        .success(getDataWilayah)
        .error(errorDataWilayah);

      function getDataWilayah(response) {
        def.resolve(response);
      }

      function errorDataWilayah() {
        def.reject('Tidak dapat mengambil data wilayah kepolisian');
      }
      return def.promise;
    }

    // BLOCK GET DATA WILAYAH KEPOLISIAN BY ID
    function getData(id) {
      var def = $q.defer();

      return $http.get(urlWilayah + '/' + id)
        .success(getDataWilayah)
        .error(errorDataWilayah);

      function getDataWilayah(response) {
        def.resolve(response);
      }

      function errorDataWilayah() {
        def.reject('Tidak dapat mengambil data wilayah kepolisian');
      }
      return def.promise;
    }

    function postDataWilayah(data) {
      return $http({
                url: urlWilayah,
                method: 'POST',
                data: data,
              }).success(postDataWilayah);

      function postDataWilayah(response) {
        console.log(response);
        return response;
      }
    }

    function updateWilayah(data) {
      return $http({
                url: urlWilayah,
                method: 'PUT',
                data: data,
              }).success(updateDataWilayah);

      function updateDataWilayah(response) {
        console.log(response);
        return response;
      }
    }

    function deleteWilayah(id) {
      return $http({
        url: urlWilayah + '/' +id,
        method: 'DELETE',
      })
    }
  }
