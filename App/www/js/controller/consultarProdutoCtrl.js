angular.module('starter').controller('consultarProdutoCtrl', function($scope, $state, $cordovaFile, $stateParams, $ionicPopup, $http, $ionicScrollDelegate, filterFilter, $location, Scopes, PopUps, CriarDiretorio) {

  console.log('Entrou no controller de Consultar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');


  //local = Scopes.getbem();
  //$scope.local = Scopes.getLocal();

  $scope.dados = Scopes.getLocal();
  dados = Scopes.getLocal();

  //console.log('$scope.dados: ' + dados.COD_LOCAL);
  //local = Scopes.getLocal();
  //console.log('Local: ' + local);

  listarBens();



  $scope.teste1 = function(i) {
    console.log('teste1 : ' + i);

  };

  /*****************************************************************************/
  /*/ Escolher um Bem /*/

  $scope.editarBem = function(bem) {
    // alert('Entrou no editarBem');
    if (bem.COD_LOCAL === dados.COD_LOCAL){

      } else{
      Scopes.setBem(bem);


    //alert('Bem: ' + bem.DESC_BEM);
    // console.log('Local: ' + local);







    console.log('Bem: ' + bem);
    // $scope.checkLocal = function(bem) {
    //   bemLocalCod = bem.COD_LOCAL;
    //
    //   res = alasql('select DESC_LOCAL from xlsx("js/Lista_de_Locais.xlsx") where COD_LOCAL = bemLocalCod');   //NÃO FUNCIONA
    //
    //   console.log('Busca: ' + res);
    // };
    // $scope.checkLocal(bem);


    $state.go('app.editarProduto');
  }
  };



  /*****************************************************************************/
  /*/ Checar CODIGO DE LOCAL COM DESCRICAO /*/











  /*****************************************************************************/
  /*/ LISTA EM JSON /*/


  ///////////////////////////////////// Funcionando, MELHOR MODO?
  function listarBens() {
    var promisse;
    $scope.bens = [];
    promisse = $http.get('js/bens.json');
      promisse.then(function (response){
        $scope.bens = response.data;
        var bens = $scope.bens;
        console.log('$scope.bens: ' + $scope.bens);
        //getBens();
      });

  }
      







  ///////////////////////////////////// Modo antigo. Dá várias voltas
  // $scope.bens = [];
  // $http.get('js/bens.json').then(function(response) {
  //   $scope.bens = response.data;
  //   var bens = $scope.bens;
  //   console.log($scope.bens);
  // });



  ///////////////////////////////////// Funcionando, mas ainda dá voltas
  // function listarLocais() {
  //   $scope.locais = [];
  //   $http.get('js/locais.json').then(function(response) {
  //     $scope.locais = response.data;
  //     var locais = $scope.locais;
  //     console.log('$scope.locais: ' + $scope.locais);
  //   });
  // }
  //
  //
  //
  // function listarLocaisEspera($scope) {
  //   var promise = listarLocais(); //make rest call
  //   $scope.waitMessage = true;
  //   console.log($scope.waitMessage);
  //
  //   $timeout(function() {
  //     //before resolving the promise, wait a certain number of ms, then
  //     //resolve and display data to user
  //     promise.then(function(response) {
  //
  //       $scope.output = response.data;
  //       $scope.waitMessage = false;
  //       console.log($scope.waitMessage);
  //     });
  //   }, 1000);
  // }



  // ******************************************************************************* //






  // ******************************************************************************* //







  // ******************************************************************************* //



  console.log("$scope.locais: " + $scope.locais);
  //console.log(bens);
  //console.log(blau = $scope.getBem());
  console.log("$scope.bem: " + $scope.bens);
  //console.log(listaBem);









});
