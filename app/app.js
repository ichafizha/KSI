angular
  .module('CrimeZone', ['ui.router', 'ngTable', 'oitozero.ngSweetAlert', 'chart.js'])
  .config(Config);

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login',
    })
    .state('admin', {
      abstract: true,
      url: '/admin',
      controller: 'AdminCtrl',
      templateUrl: 'app/admin/admin.html',
      controllerAs: 'admin',
    })

    // ADMIN DASHBOARD
    .state('admin.dashboard', {
      url: '/dashboard',
      controller: 'DashboardCtrl',
      templateUrl: 'app/admin/dashboard/dashboard.html',
      controllerAs: 'dashboard',
    })

  // LAPORAN KEJAHATAN
    .state('admin.laporankejahatan-input', {
      url: '/laporan-input',
      controller: 'LaporanInputCtrl',
      templateUrl: 'app/admin/laporan/input.html',
      controllerAs: 'laporanInput',
    })
    .state('admin.laporankejahatan-update', {
      url: '/laporan/:id/update',
      controller: 'LaporanUpdateCtrl',
      templateUrl: 'app/admin/laporan/input.html',
      controllerAs: 'laporanInput',
    })
    .state('admin.laporankejahatan-view', {
      url: '/laporan-view',
      controller: 'LaporanViewCtrl',
      templateUrl: 'app/admin/laporan/view.html',
      controllerAs: 'laporanView',
    })
    .state('admin.laporankejahatan-statistik', {
      url: '/laporan-statistik',
      controller: 'LaporanStatistikCtrl',
      templateUrl: 'app/admin/laporan/statistik.html',
      controllerAs: 'laporanStatistik',
    })

  // KEGIATAN POLRESTABES
  .state('admin.kegiatanpolrestabes-input', {
      url: '/kegiatan-input',
      controller: 'KegiatanInputCtrl',
      templateUrl: 'app/admin/kegiatan/input.html',
      controllerAs: 'kegiatanInput',
    })
  .state('admin.kegiatanpolrestabes-update', {
      url: '/kegiatan/:id/update',
      controller: 'KegiatanUpdateCtrl',
      templateUrl: 'app/admin/kegiatan/input.html',
      controllerAs: 'kegiatanInput',
    })
    .state('admin.kegiatanpolrestabes-view', {
      url: '/kegiatan-view',
      controller: 'KegiatanViewCtrl',
      templateUrl: 'app/admin/kegiatan/view.html',
      controllerAs: 'kegiatanView',
    })

  // JENIS KEJAHATAN
  .state('admin.jeniskejahatan-input', {
      url: '/jenis-input',
      controller: 'JenisInputCtrl',
      templateUrl: 'app/admin/jenis/input.html',
      controllerAs: 'jenisInput',
    })
    .state('admin.jeniskejahatan-view', {
      url: '/jenis-view',
      controller: 'JenisViewCtrl',
      templateUrl: 'app/admin/jenis/view.html',
      controllerAs: 'jenisView',
    })
    .state('admin.jeniskejahatan-update', {
      url: '/jenis/:id/update',
      controller: 'JenisUpdateCtrl',
      templateUrl: 'app/admin/jenis/input.html',
      controllerAs: 'jenisInput',
    })

  // LOKASI KEJAHATAN
  .state('admin.lokasikejahatan-input', {
      url: '/lokasi-input',
      controller: 'LokasiInputCtrl',
      templateUrl: 'app/admin/lokasi/input.html',
      controllerAs: 'lokasiInput',
    })
    .state('admin.lokasikejahatan-view', {
      url: '/lokasi-view',
      controller: 'LokasiViewCtrl',
      templateUrl: 'app/admin/lokasi/view.html',
      controllerAs: 'lokasiView',
    })
    .state('admin.lokasikejahatan-update', {
      url: '/lokasi/:id/update',
      controller: 'LokasiUpdateCtrl',
      templateUrl: 'app/admin/lokasi/input.html',
      controllerAs: 'lokasiInput',
    })

  // WILAYAH KEPOLISIAN
  .state('admin.wilayahkepolisian-input', {
      url: '/wilayah-input',
      controller: 'WilayahInputCtrl',
      templateUrl: 'app/admin/wilayah/input.html',
      controllerAs: 'wilayahInput',
    })
    .state('admin.wilayahkepolisian-view', {
      url: '/wilayah-view',
      controller: 'WilayahViewCtrl',
      templateUrl: 'app/admin/wilayah/view.html',
      controllerAs: 'wilayahView',
    })
    .state('admin.wilayahkepolisian-update', {
      url: '/wilayah/:id/update',
      controller: 'WilayahUpdateCtrl',
      templateUrl: 'app/admin/wilayah/input.html',
      controllerAs: 'wilayahInput',
    })

  // DATA PETUGAS
  .state('admin.pengguna-view', {
    url: '/pengguna-view',
    controller: 'PenggunaViewCtrl',
    templateUrl: 'app/admin/pengguna/view.html',
    controllerAs: 'penggunaView',
  })

  // DATA PETUGAS
  .state('admin.petugas-input', {
      url: '/petugas-input',
      controller: 'PetugasInputCtrl',
      templateUrl: 'app/admin/petugas/input.html',
      controllerAs: 'petugasInput',
    })
    .state('admin.petugas-view', {
      url: '/petugas-view',
      controller: 'PetugasViewCtrl',
      templateUrl: 'app/admin/petugas/view.html',
      controllerAs: 'petugasView',
    })
    .state('admin.petugas-update', {
      url: '/petugas/:id/update',
      controller: 'PetugasUpdateCtrl',
      templateUrl: 'app/admin/petugas/input.html',
      controllerAs: 'petugasInput',
    })

    // STATE PETUGAS
    .state('petugas', {
      abstract: true,
      url: '/petugas',
      controller: 'PetugasCtrl',
      templateUrl: 'app/petugas/petugas.html',
      controllerAs: 'petugas',
    })

    // PETUGAS DASHBOARD
    .state('petugas.dashboard', {
      url: '/dashboard',
      controller: 'DashboardCtrl',
      templateUrl: 'app/petugas/dashboard/dashboard.html',
      controllerAs: 'dashboard',
    })

    // KEGIATAN POLRESTABES
    .state('petugas.kegiatanpolrestabes-input', {
        url: '/kegiatan-input',
        controller: 'PetugasKegiatanInputCtrl',
        templateUrl: 'app/petugas/kegiatan/input.html',
        controllerAs: 'petugasKegiatanInput',
      })
    .state('petugas.kegiatanpolrestabes-update', {
        url: '/kegiatan/:id/update',
        controller: 'PetugasKegiatanUpdateCtrl',
        templateUrl: 'app/petugas/kegiatan/input.html',
        controllerAs: 'petugasKegiatanInput',
      })
      .state('petugas.kegiatanpolrestabes-view', {
        url: '/kegiatan-view',
        controller: 'PetugasKegiatanViewCtrl',
        templateUrl: 'app/petugas/kegiatan/view.html',
        controllerAs: 'petugasKegiatanView',
      })

      // LAPORAN KEJAHATAN
        .state('petugas.laporankejahatan-input', {
          url: '/laporan-input',
          controller: 'PetugasLaporanInputCtrl',
          templateUrl: 'app/petugas/laporan/input.html',
          controllerAs: 'petugasLaporanInput',
        })
        .state('petugas.laporankejahatan-update', {
          url: '/laporan/:id/update',
          controller: 'PetugasLaporanUpdateCtrl',
          templateUrl: 'app/petugas/laporan/input.html',
          controllerAs: 'petugasLaporanInput',
        })
        .state('petugas.laporankejahatan-view', {
          url: '/laporan-view',
          controller: 'PetugasLaporanViewCtrl',
          templateUrl: 'app/petugas/laporan/view.html',
          controllerAs: 'petugasLaporanView',
        })
        .state('petugas.laporankejahatan-statistik', {
          url: '/laporan-statistik',
          controller: 'PetugasLaporanStatistikCtrl',
          templateUrl: 'app/petugas/laporan/statistik.html',
          controllerAs: 'petugasLaporanStatistik',
        })

  .state('pengguna', {
    abstract: true,
    url: '/pengguna',
    controller: 'PenggunaCtrl',
    controllerAs: 'pengguna',
  });

  $urlRouterProvider.otherwise('/login');
}
