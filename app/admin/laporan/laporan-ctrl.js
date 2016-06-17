
angular
  .module('CrimeZone')
  .controller('LaporanInputCtrl', LaporanInputCtrl)
  .controller('LaporanViewCtrl', LaporanViewCtrl)
  .controller('LaporanStatistikCtrl', LaporanStatistikCtrl)
  .directive('statistik', statistik);

function statistik() {
  return {
    restrict: 'E',
    template: '<canvas id="bar" class="chart chart-bar" chart-data="laporanStatistik.data" chart-labels="laporanStatistik.labels"></canvas>'
  }
}

LaporanInputCtrl.$inject = ['$state', 'LaporanService', 'JenisService', 'LokasiService', '$filter', 'ActionService'];

function LaporanInputCtrl($state, LaporanService, JenisService, LokasiService, $filter, ActionService) {
  var vm = this;

  var getDataJenis = JenisService.getAllData().then(getJenis);

  function getJenis(data) {
    vm.dataJenis = data.data.response;
  }

  var getDataLokasi = LokasiService.getAllData().then(getLokasi);

  function getLokasi(data) {
    vm.dataLokasi = data.data.response;
  }

  MAX_SIZE = 200;

  var vm = this;
  var canvas = document.getElementById('canvas');

  var ctx = canvas.getContext('2d');

  var gambar = document.getElementById('gambarKejahatan');
  gambar.addEventListener('change', handleImage)

  function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();

      img.onload = function() {

        width = img.width;
        height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        ctx.canvas.width = width;
        ctx.canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

      };

      img.src = event.target.result;
      images = img;
      return img;

    }
    reader.readAsDataURL(e.target.files[0]);

  }

  vm.tambah = tambahLaporan;

  function tambahLaporan(dataKegiatan) {
    console.log(dataKegiatan);

    var data = {
      alamat: dataKegiatan.alamat,
      deskripsi: dataKegiatan.deskripsi,
      idJenis: dataKegiatan.idJenis,
      idLokasi: dataKegiatan.idLokasi,
      imgURL: dataKegiatan.imgURL,
      judul: dataKegiatan.judul,
      latitude: dataKegiatan.latitude,
      longitude: dataKegiatan.longitude,
      tanggalKejadian: dataKegiatan.tanggalKejadian,
      waktuKejadian: dataKegiatan.waktuKejadian,
    };

    var canvas = document.querySelector('canvas')
    var img = canvas.toDataURL('image/png');
    data.idRole = 3;
    data.idJenis = Number(data.idJenis);
    data.idLokasi = Number(data.idLokasi);
    data.idStatus = 1;
    data.idPetugas = 1;
    data.latitude = Number(data.latitude);
    data.longitude = Number(data.longitude);
    data.imgURL = img;
    data.tanggalKejadian = $filter('date')(vm.tanggalKejadian, 'dd-MM-yyyy');
    data.waktuKejadian = $filter('date')(vm.waktuKejadian, 'HH:mm');

    if (dataKegiatan === undefined) {
      alert('Form Input Laporan Kejahatan Tidak Boleh Kosong');
    } else {
      LaporanService.postDataLaporan(data)
        .success(postLaporan)
        .error(function (err, res) {
          if (res === 400) {
            ActionService.Gagal();
          }
        });

      function postLaporan(response) {
        ActionService.Sukses();
        console.log(response);
        $state.go('admin.laporankejahatan-view')
      }
    }
  }
}
// END BLOCK INPUT LAPORAN KEJAHATAN

// START BLOCK VIEW LAPORAN KEJAHATAN
LaporanViewCtrl.$inject = ['LaporanService', 'LokasiService', 'JenisService', '$state', 'ActionService'];

function LaporanViewCtrl(LaporanService, LokasiService, JenisService, $state, ActionService) {
  var vm = this;

  // BLOCK FUNGSI GET DATA LOKASI KEJAHATAN DI VIEW LAPORAN KEJAHATAN
  var getDataLokasi = LokasiService.getAllData().then(getLokasi);
  function getLokasi(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data.data.response);
    vm.dataLokasi = data.data.response;
  }
  // BLOCK FUNGSI GET DATA JENIS KEJAHATAN DI VIEW LAPORAN KEJAHATAN
  var getDataJenis = JenisService.getAllData().then(getJenis);
  function getJenis(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data.data.response);
    vm.dataJenis = data.data.response;
  }
  // BLOCK FUNGSI GET DATA STATUS LAPORAN DI VIEW LAPORAN KEJAHATAN
  vm.getStatus = LaporanService.getAllStatus().then(getStatus);
  function getStatus(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data.data.response);
    vm.dataStatus = data.data.response;
  }

  vm.dataLaporan = LaporanService.getAllData().then(getLaporan);

  function getLaporan(data) {
    console.log(data);
    vm.data = data.data.response;
  };

  // START BLOCK DELETE LAPORAN KEJAHATAN
  vm.delete = deleteLaporan;
  function deleteLaporan(id, judul, index) {
    console.log('clicked');
    ActionService.Hapus(hapusCallback, judul);
    function hapusCallback() {
      LaporanService.deleteLaporan(id).then(function() {
        vm.dataLaporan = LaporanService.getAllData().then(getLaporan)
      })
    }
  }
  // END BLOCK DELETE LAPORAN KEJAHATAN

  // START BLOCK GET ID FOR UPDATE LAPORAN KEJAHATAN
  vm.update = updateLaporan;
  function updateLaporan(id) {
    $state.go('admin.laporankejahatan-update', { id: id });
  }
  // END BLOCK GET ID FOR UPDATE LAPORAN KEJAHATAN
}
// END BLOCK VIEW LAPORAN KEJAHATAN

// START BLOCK UPDATE LAPORAN KEJAHATAN
// LaporanUpdateCtrl.$inject = ['LaporanService', '$state', '$filter', 'ActionService'];
// function KegiatanUpdateCtrl(KegiatanService, $state, $filter, ActionService) {
//   var vm = this;
//   var id = $state.params.id;
//   LaporanService.getData(id).then(function(response) {
//     vm.idRole = response.data.response.idRole;
//     vm.idPetugas = response.data.response.idPetugas;
//     vm.idJenis = response.data.response.idJenis;
//     vm.idLokasi = response.data.response.idLokasi;
//     vm.idStatus = response.data.response.idStatus;
//     vm.judul = response.data.response.judul;
//     vm.deskripsi = response.data.response.deskripsi;
//     vm.tanggalKejadian = response.data.response.tanggalKejadian;
//     vm.waktuKejadian = response.data.response.waktuKejadian;
//     vm.tanggalPenanganan = response.data.response.tanggalPenanganan;
//     vm.alamat = response.data.response.alamat;
//     console.log(response.data.response);
//   });
//   vm.tambah = updateLaporan;
// }
// END BLOCK UPDATE LAPORAN KEJAHATAN

LaporanStatistikCtrl.$inject = ['LaporanService'];

function LaporanStatistikCtrl(LaporanService) {
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
    vm.data = [data];

  }
}
