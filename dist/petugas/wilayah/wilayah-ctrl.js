function WilayahInputCtrl(a,t,i){function e(e){void 0===e||a.postDataWilayah(e).success(function(){i.Sukses(),t.go("petugas.wilayahkepolisian-view")}).error(function(a,t){400===t&&i.Gagal()})}var l=this;l.tambah=e}function WilayahViewCtrl(a,t,i,e){function l(t,i,l){function n(){a.deleteWilayah(t).then(function(){r.dataWilayah=a.getAllData().then(o)})}e.Hapus(n,i)}function n(a){i.go("petugas.wilayahkepolisian-update",{id:a})}function o(a){document.querySelector("loading").style.visibility="hidden",r.data=a.data.response,r.tableWilayah=new t({count:5},{counts:[5,10,15],dataset:r.data})}var r=this;r.dataWilayah=a.getAllData().then(o),r["delete"]=l,r.update=n}function WilayahUpdateCtrl(a,t,i){function e(a){o.id=a.data.response.id,o.namaWilayah=a.data.response.namaWilayah}function l(e){a.updateWilayah(e).then(function(a){(a.status=201)&&(i.Update(n),t.go("petugas.wilayahkepolisian-view"))})}var n=t.params.id,o=this;a.getData(n).then(e),o.tambah=l}angular.module("CrimeZone").controller("WilayahInputCtrl",WilayahInputCtrl).controller("WilayahUpdateCtrl",WilayahUpdateCtrl).controller("WilayahViewCtrl",WilayahViewCtrl),WilayahInputCtrl.$inject=["WilayahService","$state","ActionService"],WilayahViewCtrl.$inject=["WilayahService","NgTableParams","$state","ActionService"],WilayahUpdateCtrl.$inject=["WilayahService","$state","ActionService"];