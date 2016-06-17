angular
  .module('CrimeZone')
  .controller('JenisInputCtrl', JenisInputCtrl)
  .controller('JenisUpdateCtrl', JenisUpdateCtrl)
  .controller('JenisViewCtrl', JenisViewCtrl);

JenisInputCtrl.$inject = ['JenisService', '$state', 'ActionService'];

function JenisInputCtrl(JenisService, $state, ActionService) {
  MAX_SIZE = 200;

  var vm = this;
  var canvas = document.getElementById('canvas');

  var ctx = canvas.getContext('2d');

  var gambar = document.getElementById('gambar');
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

  this.tambah = tambah;

  function tambah(data) {
    var canvas = document.querySelector('canvas')
    var img = canvas.toDataURL('image/png');
    data.imgURL = img;
    console.log(data);
    JenisService.postDataJenis(data)
      .success(postJenis)
      .error(function (err, res) {
          if (res === 400) {
            ActionService.Gagal();
          }
        });
  }

  function postJenis(data) {
    ActionService.Sukses();
    console.log(data);
    $state.go('admin.jeniskejahatan-view');
  }
  vm.test = 'Hello';
}
// END BLOCK CODE INPUT DATA JENIS KEJAHATAN

// START BLOCK CODE VIEW DATA JENIS KEJAHATAN
JenisViewCtrl.$inject = ['JenisService', '$state', 'ActionService'];

function JenisViewCtrl(JenisService, $state, ActionService) {
  var vm = this;

  vm.dataJenis = JenisService.getAllData().then(getJenis);

  vm.delete = hapusJenis;

  function hapusJenis(id, nama, index) {

    ActionService.Hapus(hapusCallback, nama);

    function hapusCallback() {
      JenisService.deleteJenis(id).then(function(response) {
        if (response.status === 200) {
          vm.data.splice(index, 1);
        }
        console.log(response);
      });
    }
  }

  vm.update = updateJenis;

  function updateJenis(id) {
    $state.go('admin.jeniskejahatan-update', { id: id });
  }

  function getJenis(data) {
    document.querySelector('loading').style.visibility = 'hidden';
    console.log(data);
    vm.data = data.data.response;
    // vm.tableLokasi = new NgTableParams({
    //   count: 5,
    // }, {
    //   counts: [5, 10, 15],
    //   dataset: vm.data,
    // });
  };
}
// END BLOCK CODE VIEW DATA JENIS KEJAHATAN

JenisUpdateCtrl.$inject = ['JenisService', '$state', 'ActionService'];

function JenisUpdateCtrl(JenisService, $state, ActionService) {
  var vm = this;
  var id = $state.params.id;

  JenisService.getData(id).then(function(response) {
    vm.jenis = response.data.response.jenis;
    vm.imgURL = response.data.response.imgURL;
    vm.id = response.data.response.id;
    console.log(response.data.response);
  })

  MAX_SIZE = 200;

  var vm = this;
  var canvas = document.getElementById('canvas');

  var ctx = canvas.getContext('2d');

  var gambar = document.getElementById('gambar');
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

  this.tambah = tambah;

  function tambah(data) {
    var canvas = document.querySelector('canvas')
    var img = canvas.toDataURL('image/png');
    data.imgURL = img;
    console.log(data);

    JenisService.updateJenis(data).then(updateJenis);
  }

  function updateJenis(data) {
    ActionService.Update(id);
    console.log(data);
    $state.go('admin.jeniskejahatan-view');
  }
}
