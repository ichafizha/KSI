function LokasiService(e,r){function a(){function a(e){o.resolve(e)}function t(){o.reject("Gagal ambil data wilayah")}var o=r.defer();return e.get(urlLokasi).success(a).error(t)}function t(a){function t(e){i.resolve(e)}function o(){i.reject("Gagal ambil data wilayah")}var i=r.defer();return e.get(urlLokasi+"/"+a).success(t).error(o)}function o(r){function a(e){return e}return e({url:urlLokasi,method:"POST",data:r}).success(a)}function i(r){function a(e){return e}return e({url:urlLokasi,method:"PUT",data:r}).success(a)}function u(r){return e({url:urlLokasi+"/"+r,method:"DELETE"})}return{getAllData:a,getData:t,postDataLokasi:o,updateLokasi:i,deleteLokasi:u}}angular.module("CrimeZone").factory("LokasiService",LokasiService),LokasiService.$inject=["$http","$q"];var urlLokasi="https://apicrimezone.herokuapp.com/lokasi";