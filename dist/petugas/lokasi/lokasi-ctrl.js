function LokasiInputCtrl(a,t,e){function o(o){console.log(o),void 0===o?alert("Nama lokasi kejahatan tidak boleh kosong"):(console.log(o),a.postDataLokasi(o).success(function(){e.Sukses(),t.go("petugas.lokasikejahatan-view")}).error(function(a,t){400===t&&e.Gagal()}))}var i=this;i.tambah=o}function LokasiViewCtrl(a,t,e,o){function i(t,e,i){function n(){a.deleteLokasi(t).then(function(){l.dataLokasi=a.getAllData().then(s)})}o.Hapus(n,e)}function n(a){e.go("petugas.lokasikejahatan-update",{id:a})}function s(a){document.querySelector("loading").style.visibility="hidden",console.log(a),l.data=a.data.response,l.tableLokasi=new t({count:5},{counts:[5,10,15],dataset:l.data})}var l=this;l.dataLokasi=a.getAllData().then(s),l["delete"]=i,l.update=n}function LokasiUpdateCtrl(a,t,e){function o(o){a.updateLokasi(o).then(function(a){e.Update(n),t.go("petugas.lokasikejahatan-view")})}var i=this,n=t.params.id;a.getData(n).then(function(a){console.log(a.data.response),i.lokasi=a.data.response.lokasi,i.id=a.data.response.id}),i.tambah=o}angular.module("CrimeZone").controller("LokasiInputCtrl",LokasiInputCtrl).controller("LokasiUpdateCtrl",LokasiUpdateCtrl).controller("LokasiViewCtrl",LokasiViewCtrl),LokasiInputCtrl.$inject=["LokasiService","$state","ActionService"],LokasiViewCtrl.$inject=["LokasiService","NgTableParams","$state","ActionService"],LokasiUpdateCtrl.$inject=["LokasiService","$state","ActionService"];