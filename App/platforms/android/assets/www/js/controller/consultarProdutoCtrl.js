angular.module('starter').controller('consultarProdutoCtrl', function($scope, $state, $cordovaFile, $stateParams, $ionicPopup, $timeout, $http, $ionicScrollDelegate, filterFilter, $location, Scopes, PopUps, CriarDiretorio) {

  console.log('Entrou no controller de Consultar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080');




  //Início do alaSQL
  alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})')
    .then(function(res) {

      // ACHOU
      console.log('Encontrou com o alaSQL');
      //console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);

      $scope.bens = res;
      //var bens = $scope.bens; //Precisa disso?
      console.log('Bens foi preenchido.');




      ////// INFINITE SCROLL (funciona, mas inviabiliza a busca) (Não funcionando no debug, emulador ou chrome)
      // $scope.noMoreItemsAvailable = false;
      // $scope.todosBens = res;
      // $scope.bens = [];
      // var i=0;
      // $scope.loadMore = function() {
      //   $scope.bens.push({
      //     id: $scope.todosBens.length,
      //     COD_BEM: $scope.todosBens[i].COD_BEM,
      //     CHAPA: $scope.todosBens[i].CHAPA,
      //     DESC_BEM: $scope.todosBens[i].DESC_BEM,
      //     COD_LOCAL: $scope.todosBens[i].COD_LOCAL
      //   });
      //
      //   i++;
      //
      //
      //   if ($scope.bens.length == 99) {
      //     $scope.noMoreItemsAvailable = true;
      //   }
      //   $scope.$broadcast('scroll.infiniteScrollComplete');
      // };






      // ///// (OUTRO EXEMPLO QUE NÃO ESTÁ FUNCIONANDO)
      // $scope.bens = [];
      // $scope.loadMoreData = function() {
      // $http.get('url_to_load content').then(function(resp) {
      //      $scope.items = resp.item;// json format replace with your data format returned from server
      //      $scope.$broadcast('scroll.infiniteScrollComplete');
      //
      //   }, function(err) {
      //     console.error('ERR', err);
      //     // err.status will contain the status code
      //   });
      //   };







      /*****************/
      ////// Só começa o controller depois que passa pelo alaSQL (porque ele está async?)


      $scope.dados = Scopes.getLocal();
      dados = Scopes.getLocal();





      /*/ Escolher um Bem /*/

      $scope.editarBem = function(bem) {
        // alert('Entrou no editarBem');
        if (bem.COD_LOCAL === dados.COD_LOCAL) {

        } else {




          ///////////////////// PARA COMPARAR O COD_LOCAL DO BEM COM O COD_LOCAL DO LOCAL
          localCod = bem.COD_LOCAL;
          alasql.promise('SELECT DESC_LOCAL FROM xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?', [localCod])
            .then(function(res) {

              // ACHOU O LOCAL E PEGOU O PRIMEIRO
              console.log('Encontrou o local com o alaSQL');
              console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].DESC_LOCAL);
              bem.DESC_LOCAL = res[0].DESC_LOCAL;


              if (window.cordova) { //Só entra por device

                //CriarDiretorio.processar($cordovaFile, dados);
                //alert("Passou do CriarDiretorio.processar");
              }


              Scopes.setBem(bem);
              console.log('Bem: ' + bem);

              $state.go('app.editarProduto');


            }).catch(function(err) { // NÃO ENCONTROU O LOCAL

              PopUps.erroConsultar("Bem não encontrado!");
            });









          //////////****** CONTROLLER DA PÁGINA SEM LISTA (INCOMPLETO)

          // $scope.buscaBem = function(dados, bem) {
          //
          //   localCod = dados.COD_LOCAL;
          //   bemCod = bem.COD_BEM;
          //   alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE CHAPA == ?', [bemCod])
          //     .then(function(res) {
          //
          //       ////// ACHOU O LOCAL E PEGOU O PRIMEIRO
          //       //alert('Encontrou o Bem com o alaSQL');
          //
          //       console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].CHAPA + ' ' + res[0].DESC_BEM);
          //       Scopes.setBem(res[0]);
          //       $scope.bemEncontrado = res;
          //       $scope.bem = res[0];
          //
          //
          //       $scope.hideBem = false;
          //       //return $scope.hideBem;
          //
          //
          //
          //       if (window.cordova) { //Só entra por device
          //
          //         //CriarDiretorio.processar($cordovaFile, dados);
          //         //alert("Passou do CriarDiretorio.processar");
          //       }
          //
          //
          //       // alert('saiu do alaSQL');
          //       // $state.go('app.consultarProduto');
          //       console.log('Bem foi encontrado.');
          //
          //
          //     }).catch(function(err) { // NÃO ENCONTROU O LOCAL
          //
          //       PopUps.erroConsultar("Bem não encontrado!");
          //     });
          // };



        }
      };



      /*****************/
      ////// Termina o controller ainda dentro do alaSQL (porque ele está async?)

    }).catch(function(err) { // NÃO ENCONTROU O LOCAL

      PopUps.erroConsultar("Bens não encontrados!");
    });



  /*****************************************************************************/
  //////******************* LISTA PELO ALASQL  (Não está funcionando)

  // function listarBens() {
  //
  //
  //   alasql.promise('SELECT * FROM xlsx("js/Lista de Bens.xlsx",{headers:true}')
  //   .then(function(res) {
  //
  //       // ACHOU
  //       alert('Encontrou com o alaSQL');
  //       //console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
  //
  //       $scope.bens = res.data;
  //       var bens = $scope.bens;
  //       console.log('$scope.bens: ' + $scope.bens);
  //
  //
  //     }).catch(function(err) { // NÃO ENCONTROU O LOCAL
  //
  //       PopUps.erroConsultar("Bens não encontrados!");
  //     });
  //
  // }



  /*****************************************************************************/
  /*/ LISTA EM JSON /*/


  // ///////////////////////////////////// Funcionando, MELHOR MODO?
  // function listarBens() {
  //   var promisse;
  //   $scope.bens = [];
  //   promisse = $http.get('js/bens.json');
  //     promisse.then(function (response){
  //       $scope.bens = response.data;
  //       var bens = $scope.bens;
  //       console.log('$scope.bens: ' + $scope.bens);
  //       //getBens();
  //     });
  //
  // }



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


  console.log("Passou uma vez. Esperando o alaSQL. ");
  // console.log("$scope.locais: " + $scope.locais);
  //console.log(bens);
  //console.log(blau = $scope.getBem());
  // console.log("$scope.bem: " + $scope.bens);
  //console.log(listaBem);









});
