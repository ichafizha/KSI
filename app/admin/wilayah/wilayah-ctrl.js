// TODO: LOADING BAR

angular
  .module('CrimeZone')
  .controller('WilayahInputCtrl', WilayahInputCtrl)
  .controller('WilayahUpdateCtrl', WilayahUpdateCtrl)
  .controller('WilayahViewCtrl', WilayahViewCtrl);

WilayahInputCtrl.$inject = ['WilayahService', '$state', 'ActionService'];
function WilayahInputCtrl(WilayahService, $state, ActionService) {
    var vm = this;

    vm.tambah = tambah;

    function tambah(dataWilayah) {
      console.log(dataWilayah);

      if (dataWilayah === undefined) {
        alert('Nama wilayah kepolisian tidak boleh kosong');
      } else {
        console.log(dataWilayah);
        WilayahService.postDataWilayah(dataWilayah).success(function () {
          ActionService.Sukses();
          $state.go('admin.wilayahkepolisian-view');
        }).error(function (err, res) {
          if (res === 400) {
            ActionService.Gagal();
          }
        });
      }
    }
}
// END BLOCK INPUT WILAYAH KEPOLISIAN

WilayahViewCtrl.$inject = ['WilayahService', 'NgTableParams', '$state', 'ActionService'];
function WilayahViewCtrl(WilayahService, NgTableParams, $state, ActionService) {
  var vm = this;

  vm.dataWilayah = WilayahService.getAllData().then(getWilayah);
  vm.delete = hapusWilayah;

  function hapusWilayah(id, nama, index) {

    ActionService.Hapus(hapusCallback, nama);

    function hapusCallback() {
      WilayahService.deleteWilayah(id).then(function () {
        vm.dataWilayah = WilayahService.getAllData().then(getWilayah);
      });
    }
  }

  vm.update = updateWilayah;

  function updateWilayah(id) {
    $state.go('admin.wilayahkepolisian-update', {id: id});
  }

  function getWilayah(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data);
    vm.data = data.data.response;
    vm.tableWilayah = new NgTableParams({
      count: 5
    }, {
      counts: [5, 10, 15],
      dataset: vm.data
    });
  };
}
// END BLOCK VIEW WILAYAH KEPOLISIAN

WilayahUpdateCtrl.$inject = ['WilayahService', '$state', 'ActionService'];
function WilayahUpdateCtrl(WilayahService, $state, ActionService) {
  var vm = this;
  var id = $state.params.id;

  WilayahService.getData(id).then(getWilayah);
  function getWilayah(response) {
    vm.wilayah = response.data.response.wilayah;
    vm.id = response.data.response.id;
  }

  vm.tambah = updateWilayah;

  function updateWilayah(data) {
    WilayahService.updateWilayah(data).then(function (response) {
      if (response.status = 201) {
        ActionService.Update(id);
        $state.go('admin.wilayahkepolisian-view');
      }
    })
  }
}
// END BLOCK UPDATE WILAYAH KEPOLISIAN
