// TODO: TANGGAL GANTI YYYY-MM-DD

angular
  .module('CrimeZone')
  .controller('PetugasKegiatanInputCtrl', PetugasKegiatanInputCtrl)
  .controller('PetugasKegiatanUpdateCtrl', PetugasKegiatanUpdateCtrl)
  .controller('PetugasKegiatanViewCtrl', PetugasKegiatanViewCtrl);

PetugasKegiatanInputCtrl.$inject = ['PetugasKegiatanService', '$state', '$filter', 'ActionService'];

function PetugasKegiatanInputCtrl(PetugasKegiatanService, $state, $filter, ActionService) {
  var vm = this;

  vm.tambah = tambah;

  function tambah(dataKegiatan) {
    console.log(dataKegiatan);
    var data = dataKegiatan;
    data.idPetugas = 1;
    data.tanggal = $filter('date')(vm.tanggal, 'dd-MM-yyyy');
    data.waktu = $filter('date')(vm.waktu, 'HH:mm');
    console.log(data);

    if (data === undefined) {
      alert('Form kegiatan polrestabes tidak boleh kosong');
    } else {
      console.log(data);
      PetugasKegiatanService.postDataKegiatan(data).then(function() {
        ActionService.Sukses();
        $state.go('petugas.kegiatanpolrestabes-view');
      }).error(function(err, res) {
        if (res === 400) {
          ActionService.Gagal();
        }
      });
    }
  }
}

PetugasKegiatanViewCtrl.$inject = ['PetugasKegiatanService', 'NgTableParams', '$state', 'ActionService'];

function PetugasKegiatanViewCtrl(PetugasKegiatanService, NgTableParams, $state, ActionService) {
  var vm = this;

  vm.dataKegiatan = PetugasKegiatanService.getAllData().then(getKegiatan);

  vm.delete = deleteKegiatan;

  function deleteKegiatan(id, judul, index) {

    ActionService.Hapus(hapusCallback, judul);

    function hapusCallback() {
      PetugasKegiatanService.deleteKegiatan(id).then(function() {
        vm.dataKegiatan = PetugasKegiatanService.getAllData().then(getKegiatan);
      });
    }

  }

  vm.update = updateKegiatan;

  function updateKegiatan(id) {
    $state.go('petugas.kegiatanpolrestabes-update', { id: id });
  }

  function getKegiatan(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data);
    vm.data = data.data.response;

    vm.tableKegiatan = new NgTableParams({
      count: 5,
    }, {
      counts: [5, 10, 15],
      dataset: vm.data,
    });
  };
}

PetugasKegiatanUpdateCtrl.$inject = ['PetugasKegiatanService', '$state', '$filter', 'ActionService'];

function PetugasKegiatanUpdateCtrl(PetugasKegiatanService, $state, $filter, ActionService) {
  var vm = this;
  var id = $state.params.id;

  PetugasKegiatanService.getData(id).then(function(response) {
    vm.alamat = response.data.response.alamat;
    vm.idPetugas = response.data.response.idPetugas;
    vm.judul = response.data.response.judul;
    vm.deskripsi = response.data.response.deskripsi;
    vm.tanggal = response.data.response.tanggal;
    vm.waktu = response.data.response.waktu;
    console.log(response.data.response);
  });

  vm.tambah = updateKegiatan;

  function updateKegiatan(data) {
    data.id = id;
    data.tanggal = $filter('date')(vm.tanggal, 'dd-MM-yyyy');
    data.waktu = $filter('date')(vm.waktu, 'HH:mm');
    console.log(data);
    PetugasKegiatanService.updateKegiatan(data).then(function(response) {
      ActionService.Update(id);
      $state.go('petugas.kegiatanpolrestabes-view');
    });
  }
}
