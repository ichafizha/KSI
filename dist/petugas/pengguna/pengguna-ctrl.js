function PenggunaViewCtrl(e,n){function t(n,t){e.deletePengguna(n).then(function(){g.dataPengguna=e.getAllData().then(a)})}function a(e){document.querySelector("loading").style.visibility="hidden",g.data=e.data.response,g.tablePengguna=new n({count:5},{counts:[5,10,15],dataset:g.data})}var g=this;g.dataPengguna=e.getAllData().then(a),g["delete"]=t}angular.module("CrimeZone").controller("PenggunaViewCtrl",PenggunaViewCtrl),PenggunaViewCtrl.$inject=["PenggunaService","NgTableParams"];