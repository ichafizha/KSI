// TODO: TANGGAL GANTI YYYY-MM-DD

angular
  .module('CrimeZone')
  .controller('KegiatanInputCtrl', KegiatanInputCtrl)
  .controller('KegiatanUpdateCtrl', KegiatanUpdateCtrl)
  .controller('KegiatanViewCtrl', KegiatanViewCtrl);

KegiatanInputCtrl.$inject = ['KegiatanService', '$state', '$filter', 'ActionService'];

function KegiatanInputCtrl(KegiatanService, $state, $filter, ActionService) {
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
      KegiatanService.postDataKegiatan(data).then(function() {
        ActionService.Sukses();
        $state.go('admin.kegiatanpolrestabes-view');
      }).error(function(err, res) {
        if (res === 400) {
          ActionService.Gagal();
        }
      });
    }
  }
}

KegiatanViewCtrl.$inject = ['KegiatanService', 'NgTableParams', '$state', 'ActionService'];

function KegiatanViewCtrl(KegiatanService, NgTableParams, $state, ActionService) {
  var vm = this;

  vm.dataKegiatan = KegiatanService.getAllData().then(getKegiatan);

  vm.delete = deleteKegiatan;

  function deleteKegiatan(id, judul, index) {

    ActionService.Hapus(hapusCallback, judul);

    function hapusCallback() {
      KegiatanService.deleteKegiatan(id).then(function() {
        vm.dataKegiatan = KegiatanService.getAllData().then(getKegiatan);
      });
    }

  }

  vm.update = updateKegiatan;

  function updateKegiatan(id) {
    $state.go('admin.kegiatanpolrestabes-update', { id: id });
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

KegiatanUpdateCtrl.$inject = ['KegiatanService', '$state', '$filter', 'ActionService'];

function KegiatanUpdateCtrl(KegiatanService, $state, $filter, ActionService) {
  var vm = this;
  var id = $state.params.id;

  KegiatanService.getData(id).then(function(response) {
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
    KegiatanService.updateKegiatan(data).then(function(response) {
      ActionService.Update(id);
      $state.go('admin.kegiatanpolrestabes-view');
    });
  }
}
