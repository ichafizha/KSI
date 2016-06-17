angular
  .module('CrimeZone')
  .controller('PetugasInputCtrl', PetugasInputCtrl)
  .controller('PetugasUpdateCtrl', PetugasUpdateCtrl)
  .controller('PetugasViewCtrl', PetugasViewCtrl);

PetugasInputCtrl.$inject = ['PetugasService', 'WilayahService', '$state', 'ActionService'];
function PetugasInputCtrl(PetugasService, WilayahService, $state, ActionService) {
  var vm = this;

  /**
   * GET ALL DATA WILAYAH
   * @return {OBJECT} AMBIL SEMUA DATA WILAYAH BUAT DI FORM
   */
  WilayahService.getAllData().then(function(data) {
    vm.wilayahs = data.data.response;
  });

  /**
   * GET ROLE PETUGAS
   * @return {OBJECT} AMBIL DATA ROLE UNTUK DI FORM
   */
  PetugasService.getAllRole().then(function(data) {
    vm.roles = data.data.response;
  });

  /**
   * METHOD TAMBAH KETIKA BUTTON DI CLICK
   * @type {FUNCTION}
   */
  vm.tambah = tambah;

  function tambah(data) {
    console.log(data);
    if (data === undefined) {
      alert('Form petugas tidak boleh kosong');
    } else {
      console.log(data);
      PetugasService.postDataPetugas(data).success(function() {
        ActionService.Sukses();
        $state.go('admin.petugas-view');
      }).error(function (err, res) {
          if (res === 400) {
            ActionService.Gagal();
          }
        });
    }
  }
}
// END BLOCK NEW ADD DATA PETUGAS

PetugasViewCtrl.$inject = ['PetugasService', 'NgTableParams', '$state', 'ActionService'];
function PetugasViewCtrl(PetugasService, NgTableParams, $state, ActionService) {
  var vm = this;
  vm.dataPetugas = PetugasService.getAllPetugasDetail().then(getPetugas);
  vm.delete = hapusPetugas;

  function hapusPetugas(id, nama, index) {

    ActionService.Hapus(hapusCallback, nama);

    function hapusCallback() {
      PetugasService.deletePetugas(id).then(function () {
        vm.dataPetugas = PetugasService.getAllPetugasDetail().then(getPetugas);
      })
    }
  }

  vm.update = updatePetugas;
  function updatePetugas(id) {
    $state.go('admin.petugas-update', { id: id });
  }

  function getPetugas(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data);
    vm.data = data.data.response;
    vm.tablePetugas = new NgTableParams({
      count: 5,
    }, {
      counts: [5, 10, 15],
      dataset: vm.data,
    });
  };
}
// END BLOCK VIEW ALL DATA PETUGAS


PetugasUpdateCtrl.$inject = ['PetugasService', 'WilayahService', '$state', 'ActionService'];
function PetugasUpdateCtrl(PetugasService, WilayahService, $state, ActionService) {
  var vm = this;
  var id = $state.params.id;

  WilayahService.getAllData().then(function (data) {
    vm.wilayahs = data.data.response;
  });

  PetugasService.getAllRole().then(function (data) {
    vm.roles = data.data.response;
  });

  PetugasService.getPetugasDetailById(id).then(function (data) {
    vm.id = data.data.response.id;
    vm.role = data.data.response.role;
    vm.wilayah = data.data.response.wilayah;
    vm.fullname = data.data.response.fullname;
    vm.email = data.data.response.email;
    vm.nrp = data.data.response.nrp;
    vm.password = data.data.response.password;
  });

  vm.tambah = updatePetugas;

  function updatePetugas(data) {
    PetugasService.updatePetugas(data).then(function (response) {
      ActionService.Update(id);
      $state.go('admin.petugas-view');
    });
  }
}
