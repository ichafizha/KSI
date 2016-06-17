angular.module('CrimeZone')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['LaporanService'];
function DashboardCtrl(LaporanService) {
  var vm = this;

  LaporanService.getStatistik().then(getStatistik);

  function getStatistik(data) {
    var stat = data.data.response;
    console.log(stat);
    var labels = [];
    var data = []
    stat.forEach(function (e) {
      console.log(e);
      labels.push(e.label);
      data.push(e.jumlah);
    })

    console.log(labels);
    console.log(data);
    vm.labels = labels;
    vm.data = data;

  }
}
