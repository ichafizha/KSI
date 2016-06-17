angular
  .module('CrimeZone')
  .controller('LokasiInputCtrl', LokasiInputCtrl)
  .controller('LokasiUpdateCtrl', LokasiUpdateCtrl)
  .controller('LokasiViewCtrl', LokasiViewCtrl);

LokasiInputCtrl.$inject = ['LokasiService', '$state', 'ActionService'];

function LokasiInputCtrl(LokasiService, $state, ActionService) {
  var vm = this;

  vm.tambah = tambah;

  function tambah(dataLokasi) {
    console.log(dataLokasi);

    if (dataLokasi === undefined) {
      alert('Nama lokasi kejahatan tidak boleh kosong');
    } else {
      console.log(dataLokasi);
      LokasiService.postDataLokasi(dataLokasi).success(function() {
        ActionService.Sukses();
        $state.go('admin.lokasikejahatan-view');
      }).error(function(err, res) {
        if (res === 400) {
          ActionService.Gagal();
        }
      });
    }
  }
}

LokasiViewCtrl.$inject = ['LokasiService', 'NgTableParams', '$state', 'ActionService'];

function LokasiViewCtrl(LokasiService, NgTableParams, $state, ActionService) {
  var vm = this;

  vm.dataLokasi = LokasiService.getAllData().then(getLokasi);

  vm.delete = deleteLokasi;

  function deleteLokasi(id, nama, index) {

    ActionService.Hapus(hapusCallback, nama);

    function hapusCallback() {
      LokasiService.deleteLokasi(id).then(function() {
        vm.dataLokasi = LokasiService.getAllData().then(getLokasi);
      });
    }
  }

  vm.update = updateLokasi;

  function updateLokasi(id) {
    $state.go('admin.lokasikejahatan-update', { id: id });
  }

  function getLokasi(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data);
    vm.data = data.data.response;
    vm.tableLokasi = new NgTableParams({
      count: 5,
    }, {
      counts: [5, 10, 15],
      dataset: vm.data,
    });
  };
}

LokasiUpdateCtrl.$inject = ['LokasiService', '$state', 'ActionService'];

function LokasiUpdateCtrl(LokasiService, $state, ActionService) {
  var vm = this;
  var id = $state.params.id;

  LokasiService.getData(id).then(function(response) {
    console.log(response.data.response);
    vm.lokasi = response.data.response.lokasi;
    vm.id = response.data.response.id;
  });

  vm.tambah = updateLokasi;

  function updateLokasi(data) {
    LokasiService.updateLokasi(data).then(function(response) {
      ActionService.Update(id);
      $state.go('admin.lokasikejahatan-view');
    });
  }
}
