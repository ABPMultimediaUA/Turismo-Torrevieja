var app = angular.module('appGVENT', []);

app.controller('loginCtrl', ['$scope', function($scope) {
  $scope.master = {};

  $scope.update = function(user) {
    $scope.master = angular.copy(user);

    var usr = 'usr1@usr1.es';
    var pass = 'pass1';

    let usrEmail = $scope.master.email;
    let usrPass = $scope.master.password;

    if(usr == usrEmail & pass == usrPass){
      console.log('login oki');
    }
$location.path('workspace.html');

  };

  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
}]);

app.controller("contactoCtrl", contactoCtrl);

function contactoCtrl($auth, $location) {
	/*var vm = this;
    this.contacto = function() {
    	$auth.contacto({
        	email: vm.email,
            password: vm.password
        })
        .then(function() {
        	// Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $location.path("/private");
        })
        .catch(function(response) {
        	// Si ha habido errores, llegaremos a esta función
        });
    }*/
};
