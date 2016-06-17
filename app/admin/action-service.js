angular
  .module('CrimeZone')
  .factory('ActionService', ActionService);

ActionService.$inject = ['$http', '$q', 'SweetAlert'];

function ActionService($http, $q, SweetAlert) {
  return {
    Hapus: Hapus,
    Sukses: Sukses,
    Update: Update,
    Gagal: Gagal,
  };

  function Hapus(callback, nama) {

    SweetAlert.swal({
        title: "Anda yakin akan menghapus " + nama + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
      },

      function(isConfirm) {
        console.log(isConfirm);
        if (isConfirm) {
          callback();
          SweetAlert.swal("Deleted", " Data "+ nama +" berhasil dihapus.", "success");
        } else {
          SweetAlert.swal("Cancel", "Data tidak jadi dihapus", "error");
        }
      });
  }

  function Sukses() {
    SweetAlert.swal("Sukses", "Anda berhasil menambahkan data baru", "success");
  }

  function Update(id) {
    SweetAlert.swal("Sukses", "Anda berhasil mengubah data dengan id = " + id, "success");
  }

  function Gagal() {
    SweetAlert.swal("Error!", "Check kembali form anda!", "error");
  }
}
