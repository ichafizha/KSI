function PetugasLaporanInputCtrl(t,a,e,i,n,o){function r(t){l.dataJenis=t.data.response}function s(t){l.dataLokasi=t.data.response}function d(t){var a=new FileReader;a.onload=function(t){var a=new Image;return a.onload=function(){width=a.width,height=a.height,width>height?width>MAX_SIZE&&(height*=MAX_SIZE/width,width=MAX_SIZE):height>MAX_SIZE&&(width*=MAX_SIZE/height,height=MAX_SIZE),c.canvas.width=width,c.canvas.height=height,c.drawImage(a,0,0,width,height)},a.src=t.target.result,images=a,a},a.readAsDataURL(t.target.files[0])}function u(e){function i(a){o.Sukses(),t.go("petugas.laporankejahatan-view")}var r={alamat:e.alamat,deskripsi:e.deskripsi,idJenis:e.idJenis,idLokasi:e.idLokasi,imgURL:e.imgURL,judul:e.judul,latitude:e.latitude,longitude:e.longitude,tanggalKejadian:e.tanggalKejadian,waktuKejadian:e.waktuKejadian},s=document.querySelector("canvas"),d=s.toDataURL("image/png");r.idRole=3,r.idJenis=Number(r.idJenis),r.idLokasi=Number(r.idLokasi),r.idStatus=1,r.idPetugas=1,r.latitude=Number(r.latitude),r.longitude=Number(r.longitude),r.imgURL=d,r.tanggalKejadian=n("date")(l.tanggalKejadian,"dd-MM-yyyy"),r.waktuKejadian=n("date")(l.waktuKejadian,"HH:mm"),void 0===e||a.postDataLaporan(r).success(i).error(function(t,a){400===a&&o.Gagal()})}var l=this;e.getAllData().then(r),i.getAllData().then(s);MAX_SIZE=200;var l=this,g=document.getElementById("canvas"),c=g.getContext("2d"),h=document.getElementById("gambarKejahatan");h.addEventListener("change",d),l.tambah=u}function PetugasLaporanViewCtrl(t,a,e,i,n){function o(t){document.querySelector("loading").style.visibility="hidden",l.dataLokasi=t.data.response}function r(t){document.querySelector("loading").style.visibility="hidden",l.dataJenis=t.data.response}function s(t){document.querySelector("loading").style.visibility="hidden",l.dataStatus=t.data.response}function d(t){l.data=t.data.response}function u(a,e,i){function o(){t.deleteLaporan(a).then(function(){l.dataLaporan=t.getAllData().then(d)})}n.Hapus(o,e)}var l=this;a.getAllData().then(o),e.getAllData().then(r);l.getStatus=t.getAllStatus().then(s),l.dataLaporan=t.getAllData().then(d),l["delete"]=u}function PetugasLaporanStatistikCtrl(t){function a(t){var a=t.data.response,i=[],t=[];a.forEach(function(a){i.push(a.label),t.push(a.jumlah)}),e.labels=i,e.data=[t]}var e=this;t.getStatistik().then(a)}angular.module("CrimeZone").controller("PetugasLaporanInputCtrl",PetugasLaporanInputCtrl).controller("PetugasLaporanViewCtrl",PetugasLaporanViewCtrl).controller("PetugasLaporanStatistikCtrl",PetugasLaporanStatistikCtrl),PetugasLaporanInputCtrl.$inject=["$state","PetugasLaporanService","JenisService","LokasiService","$filter","ActionService"],PetugasLaporanViewCtrl.$inject=["PetugasLaporanService","LokasiService","JenisService","$state","ActionService"],PetugasLaporanStatistikCtrl.$inject=["PetugasLaporanService"];