function LoginService(e,n){function o(n){function o(e){return e}return e({url:urlLogin,headers:{"Content-Type":"application/json"},method:"POST",data:n}).success(o)}return{postDataLogin:o}}angular.module("CrimeZone").factory("LoginService",LoginService),LoginService.$inject=["$http","$q"];var urlLogin="https://apicrimezone.herokuapp.com/petugas/login";