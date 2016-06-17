angular
  .module('CrimeZone')
  .controller('PenggunaViewCtrl', PenggunaViewCtrl);

PenggunaViewCtrl.$inject = ['PenggunaService', 'NgTableParams', 'ActionService'];
function PenggunaViewCtrl(PenggunaService, NgTableParams, ActionService) {
  var vm = this;
  vm.dataPengguna = PenggunaService.getAllData().then(getPengguna);
  vm.delete = hapusPengguna;

  function hapusPengguna(id, nama, index) {
    ActionService.Hapus(hapusCallback, nama);
    function hapusCallback() {
      PenggunaService.deletePengguna(id).then(function () {
        vm.dataPengguna = PenggunaService.getAllData().then(getPengguna);
      })
    }
  }

  function getPengguna(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data);
    vm.data = data.data.response;

    vm.tablePengguna = new NgTableParams({
      count: 5
    }, {
      counts: [5, 10, 15],
      dataset: vm.data
    });
  };
}
