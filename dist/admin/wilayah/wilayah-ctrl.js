function WilayahInputCtrl(a,t,i){function e(e){void 0===e||a.postDataWilayah(e).success(function(){i.Sukses(),t.go("admin.wilayahkepolisian-view")}).error(function(a,t){400===t&&i.Gagal()})}var n=this;n.tambah=e}function WilayahViewCtrl(a,t,i,e){function n(t,i,n){function l(){a.deleteWilayah(t).then(function(){r.dataWilayah=a.getAllData().then(o)})}e.Hapus(l,i)}function l(a){i.go("admin.wilayahkepolisian-update",{id:a})}function o(a){document.querySelector("loading").style.visibility="hidden",r.data=a.data.response,r.tableWilayah=new t({count:5},{counts:[5,10,15],dataset:r.data})}var r=this;r.dataWilayah=a.getAllData().then(o),r["delete"]=n,r.update=l}function WilayahUpdateCtrl(a,t,i){function e(a){l.wilayah=a.data.response.wilayah,l.id=a.data.response.id}function n(e){a.updateWilayah(e).then(function(a){(a.status=201)&&(i.Update(o),t.go("admin.wilayahkepolisian-view"))})}var l=this,o=t.params.id;a.getData(o).then(e),l.tambah=n}angular.module("CrimeZone").controller("WilayahInputCtrl",WilayahInputCtrl).controller("WilayahUpdateCtrl",WilayahUpdateCtrl).controller("WilayahViewCtrl",WilayahViewCtrl),WilayahInputCtrl.$inject=["WilayahService","$state","ActionService"],WilayahViewCtrl.$inject=["WilayahService","NgTableParams","$state","ActionService"],WilayahUpdateCtrl.$inject=["WilayahService","$state","ActionService"];