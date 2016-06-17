angular
  .module('CrimeZone')
  .factory('PetugasService', PetugasService);

PetugasService.$inject = ['$http', '$q'];

var urlPetugas = 'https://apicrimezone.herokuapp.com/petugas';
var urlPetugasDetail = 'https://apicrimezone.herokuapp.com/petugas/detail';
var urlRole = 'https://apicrimezone.herokuapp.com/role';

function PetugasService($http, $q) {
    return {
      getAllData: getAllData,
      getAllPetugasDetail: getAllPetugasDetail,
      getData: getData,
      getPetugasDetailById: getPetugasDetailById,
      getAllRole: getAllRole,
      postDataPetugas: postDataPetugas,
      updatePetugas: updatePetugas,
      deletePetugas: deletePetugas,
    };

    // FUNGSI GET ALL DATA PETUGAS
    function getAllData() {
      var def = $q.defer();
      return $http.get(urlPetugas)
        .success(getDataPetugas)
        .error(errorDataPetugas);
      function getDataPetugas(response) {
        def.resolve(response);
      }
      function errorDataPetugas() {
        def.reject('Tidak dapat mengambil data petugas');
      }
      return def.promise;
    }

    // BLOCK GET ALL DATA PETUGAS DENGAN DETAIL
    function getAllPetugasDetail() {
      var def = $q.defer();
      return $http.get(urlPetugasDetail)
        .success(getDataPetugasDetail)
        .error(errorDataPetugasDetail);
      function getDataPetugasDetail(response) {
        def.resolve(response);
      }
      function errorDataPetugasDetail() {
        def.reject('Tidak dapat mengambil data detail petugas');
      }
      return def.promise;
    }

    // BLOCK FUNGSI GET DATA PETUGAS BY ID
    function getData(id) {
      var def = $q.defer();
      return $http.get(urlPetugas + '/' + id)
        .success(getDataPetugas)
        .error(errorDataPetugas);
      function getDataPetugas(response) {
        def.resolve(response);
      }
      function errorDataPetugas() {
        def.reject('Tidak dapat mengambil data petugas');
      }
      return def.promise;
    }

    // BLOCK FUNGSI GET DATA PETUGAS DENGAN DETAIL BY ID
    function getPetugasDetailById(id) {
      var def = $q.defer();
      return $http.get(urlPetugasDetail + '/' + id)
        .success(getDataPetugasDetail)
        .error(errorDataPetugasDetail);
      function getDataPetugasDetail(response) {
        def.resolve(response);
      }
      function errorDataPetugasDetail() {
        def.reject('Tidak dapat mengambil data petugas');
      }
      return def.promise;
    }

    // BLOCK POST NEW DATA PETUGAS
    function postDataPetugas(data) {
      return $http({
                url: urlPetugas,
                method: 'POST',
                data: data,
              }).success(postDataPetugas);

      function postDataPetugas(response) {
        console.log(response);
        return response;
      }
    }

    // BLOCK UPDATE EXISTING DATA PETUGAS BY ID
    function updatePetugas(data) {
      return $http({
                url: urlPetugas,
                method: 'PUT',
                data: data,
              }).success(updateDataPetugas);

      function updateDataPetugas(response) {
        console.log(response);
        return response;
      }
    }

    // BLOCK DELETE EXISTING DATA PETUGAS BY ID
    function deletePetugas(id) {
      return $http({
        url: urlPetugas + '/' + id,
        method: 'DELETE',
      });
    }

    // BLOCK FUNGSI GET ALL DATA ROLE
    function getAllRole() {
      var def = $q.defer();
      return $http.get(urlRole)
        .success(getDataRole)
        .error(errorDataRole);
      function getDataRole(response) {
        def.resolve(response);
      }
      function errorDataRole() {
        def.reject('Tidak dapat mengambil data role');
      }
      return def.promise;
    }

  }
