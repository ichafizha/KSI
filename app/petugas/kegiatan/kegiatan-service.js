angular
  .module('CrimeZone')
  .factory('PetugasKegiatanService', PetugasKegiatanService);

PetugasKegiatanService.$inject = ['$http', '$q'];

var urlKegiatan = 'https://apicrimezone.herokuapp.com/kegiatan';

function PetugasKegiatanService($http, $q) {
    return {
      getAllData: getAllData,
      getData: getData,
      postDataKegiatan: postDataKegiatan,
      updateKegiatan: updateKegiatan,
      deleteKegiatan: deleteKegiatan,
    };

    function getAllData() {
      var def = $q.defer();

      return $http.get(urlKegiatan)
      .success(getDataKegiatan)
      .error(errorDataKegiatan);

      function getDataKegiatan(response) {
        def.resolve(response);
      }

      function errorDataKegiatan() {
        def.reject('Gagal ambil data kegiatan');
      }

      return def.promise;

    }

    function getData(id) {
      var def = $q.defer();

      return $http.get(urlKegiatan + '/' + id)
      .success(getDataKegiatan)
      .error(errorDataKegiatan);

      function getDataKegiatan(response) {
        def.resolve(response);
      }

      function errorDataKegiatan() {
        def.reject('Gagal ambil data kegiatan');
      }

      return def.promise;

    }

    function postDataKegiatan(data) {
      return $http({
                url: urlKegiatan,
                method: 'POST',
                data: data,
              }).success(postDataKegiatan);

      function postDataKegiatan(response) {
        console.log(response);
        return response;
      }
    }

    function updateKegiatan(data) {
      return $http({
                url: urlKegiatan,
                method: 'PUT',
                data: data,
              }).success(updateDataKegiatan);

      function updateDataKegiatan(response) {
        console.log(response);
        return response;
      }
    }

    function deleteKegiatan(id) {
      return $http({
        url: urlKegiatan + '/' + id,
        method: 'DELETE',
      });
    }
  }
