angular
  .module('CrimeZone')
  .factory('LaporanService', LaporanService);

LaporanService.$inject = ['$http', '$q'];

var urlLaporan = 'https://apicrimezone.herokuapp.com/laporan';
var urlDetailLaporan = 'http://apicrimezone.herokuapp.com/laporan/detail';
var urlStatus = 'http://apicrimezone.herokuapp.com/status';
var urlStatistik = 'https://apicrimezone.herokuapp.com/statistik';

function LaporanService($http, $q) {
    return {
      getAllData: getAllData,
      postDataLaporan: postDataLaporan,
      getAllStatus: getAllStatus,
      deleteLaporan: deleteLaporan,
      getData: getData,
      getStatistik: getStatistik,
    };

    function postDataLaporan(data) {
      return $http({
                url: urlLaporan,
                method: 'POST',
                data: data,
              }).success(postDataLaporan);

      function postDataLaporan(response) {
        console.log(response);
        return response;
      }
    }

    function getAllData() {
      var def = $q.defer();

      return $http.get(urlDetailLaporan)
            .success(getDataLaporan)
            .error(errorDataLaporan);

      function getDataLaporan(response) {
        def.resolve(response);
      }

      function errorDataLaporan() {
        def.reject('Gagal ambil data wilayah');
      }

      return def.promise;

    }

    // BLOCK FUNGSI GET ALL STATUS LAPORAN
    function getAllStatus() {
      var def = $q.defer();
      return $http.get(urlStatus)
        .success(getDataStatus)
        .error(errorDataStatus);
      function getDataStatus(response) {
        def.resolve(response);
      }
      function errorDataStatus() {
        def.reject("Tidak bisa mengambil data status")
      }
      return def.promise
    }

    // START BLOCK DELETE LAPORAN BY ID
    function deleteLaporan(id) {
      return $http({
        url: urlLaporan + '/' + id,
        method: 'DELETE',
      });
    }
    // END BLOCK DELETE LAPORAN BY ID

    // START BLOCK GET DATA LAPORAN BY ID
    function getData(id) {
      var def = $q.defer();
      return $http.get(urlLaporan + '/' + id)
        .success(getDataLaporan)
        .error(errorDataLaporan);
      function getDataLaporan(response) {
        def.resolve(response);
      }
      function errorDataLaporan() {
        def.reject('Tidak dapat mengambil Data Laporan Kejahatan')
      }
      return def.promise;
    }
    // END BLOCK GET DATA LAPORAN BY ID

    // START BLOCK GET STATISTIK KEJAHATAN
    function getStatistik() {
      var def = $q.defer();
      return $http.get(urlStatistik)
        .success(getDataStatistik)
        .error(errorDataStatistik);

        function getDataStatistik(response) {
          def.resolve(response);
        }

        function errorDataStatistik() {
          def.reject('Error get data statistik')
        }

        return def.promise;
    }
    // END BLOCK GET STATISTIK KEJAHATAN
  }
