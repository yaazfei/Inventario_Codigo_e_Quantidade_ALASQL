angular.module('starter').controller('editarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $ionicModal, $http, $timeout, Scopes, PopUps, CriarDiretorio, FormatarCsv, buscaArquivos) {


  console.log('Entrou no controller de Editar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518 (duas entradas), 000898 (sem local)');


  // listarLocais();

  // var dir = "files/Lista_de_Locais.xlsx";
  var arquivoLocais = Scopes.getArquivoLocais();
  // alasql.promise('SELECT * FROM xlsx(?,{headers:true})', [dir])
  alasql.promise('SELECT * FROM ?', [arquivoLocais])
    .then(function(res) {

      // ACHOU
      console.log('Encontrou com o ALQSQL: ' + res[0]);

      $scope.locais = res;
      //var bens = $scope.bens; //Precisa disso?
      console.log('locais foi preenchido.');
      $scope.localModificado = false;



      /*****************/
      ////// Só começa o controller depois que passa pelo alaSQL (porque ele está async?)



      var bem = Scopes.getBem();
      $scope.bem = bem;

      var dados = Scopes.getLocal();
      $scope.dados = dados;


      $scope.localSelecionado = function(local) {
        console.log('Selecionou o local : ' + local.DESC_LOCAL + ' ' + local.COD_LOCAL);
        $scope.local = local;
        $scope.localModificado = true;
        $scope.hideModal();
      };


      $scope.clearInput = function(input, form) { // NÃO FUNCIONA
        console.log('Entrou no clearSearch');

        $scope.local = null;
        local = null;
        $scope.localModificado = false;

      };


      /*****************************************************************************/

      /////////////////////////////////////
      //// ESCREVER PRODUTO INVÁLIDO /////
      ////////////////////////////////////

      $scope.escreverProdutoEditado = function() {

        dados = Scopes.getLocal();
        bem = Scopes.getBem();
        local = $scope.local;

        if ($scope.localModificado === true) {
          console.log('Novo local foi preenchido. Será atualizado para ele.');
          dados = local;
        } else {
          console.log('Novo local não foi preenchido. Será atualizado para o local atual.');
        }


        //////// WHIT GAMBI (GUARDA TODOS COM A MESMA CHAPA DEPOIS ADICIONA JUNTO COM O PUSH DO BEM)
        var arquivoBens = Scopes.getArquivo();
        alasql.promise('SELECT * FROM ? WHERE CHAPA == ?', [arquivoBens, bem.CHAPA])
          .then(function(chapasIguais) {
            //Encontrou todos com a mesma chapa
            console.log('Resultados encontrados: ' + chapasIguais.length);

            alasql.promise('SELECT * FROM ? WHERE CHAPA !== ?', [arquivoBens, bem.CHAPA])
              .then(function(res) {
                //Selecionou todos os que possuem Chapas diferentes do bem escolhido (e consequentemente dos que tem chapasIguais a ele)
                console.log('Resultados encontrados: ' + res.length);
                bem.COD_LOCAL = dados.COD_LOCAL;
                res.push(bem); //Já colocou o Bem editado nos Bens


                if (chapasIguais.length > 1) { //Caso tenha mais de um com a mesma CHAPA

                  alasql.promise('SELECT * FROM ? WHERE COD_BEM !== ?', [chapasIguais, bem.COD_BEM])
                    .then(function(restantes) {
                      //Seleciona todos os chapasIguais menos o que já foi adicionado no push (baseado no seu COD_BEM)
                      console.log('Resultados encontrados: ' + res.length);
                      var resTotal = res.concat(restantes); //Colocou os bens que ficaram de fora na variável de Bens.
                      console.log('Bens foram anexados.');
                      // Scopes.setArquivo(res); //MELHOR DEIXAR PRA FAZER ISSO DEPOIS DE SALVAR NO ARQUIVO

                      if (window.cordova) { //Só entra por device
                        CriarDiretorio.processar($cordovaFile, resTotal);
                      }

                      console.log('Se estiver no Browser, não vai escrever no arquivo.');

                    }).catch(function(err) { // NÃO ENCONTROU O LOCAL
                      console.log(err);
                    });

                } else { //Caso não tenha mais de um com a mesma CHAPA

                  console.log('Bem foi anexado.');

                  if (window.cordova) { //Só entra por device
                    CriarDiretorio.processar($cordovaFile, res);
                  }

                  console.log('Se estiver no Browser, não vai escrever no arquivo.');
                }

              }).catch(function(err) { // NÃO ENCONTROU O LOCAL
                console.log(err);
              });

          }).catch(function(err) { // NÃO ENCONTROU O LOCAL
            console.log(err);
          });


      //////////// WHITHOUT GAMBI (NÃO ELIMINA SÓ UM, MAS OS DOIS COM A MESMA CHAPA)

      //   //alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA !== ?', [dir, bem.CHAPA])
      //   alasql.promise('SELECT * FROM ? \ IFF (COD_BEM <> ? AND CHAPA !== ?)', [arquivoBens, bem.COD_BEM, bem.CHAPA])
      //     .then(function(res) {
      //       // ACHOU
      //       bem.COD_LOCAL = dados.COD_LOCAL;
      //       res.push(bem);
      //
      //       console.log('Primeiro de res ' + res[0].CHAPA);
      //       // Scopes.setArquivo(res); //MELHOR DEIXAR PRA FAZER ISSO DEPOIS DE SALVAR NO ARQUIVO
      //
      //       if (window.cordova) { //Só entra por device
      //         CriarDiretorio.processar($cordovaFile, res);
      //       }
      //
      //       console.log('Se estiver no Browser, não vai escrever no arquivo.');
      //
      //
      //     }).catch(function(err) { // NÃO ENCONTROU O bem
      //
      //       console.log(err);
      //       PopUps.erroConsultar("Erro ao salvar bem!");
      //     });
      //
      // };


      };
      /*****************************************************************************/


      //////////////////////////
      //// MODAL DE LOCAL /////
      /////////////////////////

      ////Funcionando

      $scope.openModal = function() {

        if ($scope.selectlocal !== undefined) { //sempre aparecem undefined? (NÃO PEGA)
          $scope.modalCtrl.$setPristine(); //Esse não é uma função
          $scope.selectlocalradio.$setPristine();
        }

        $scope.modalCtrl.show();
      };


      $ionicModal.fromTemplateUrl('templates/modalLocais.html', function(modal) {
        $scope.modalCtrl = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up', //'slide-left-right', 'slide-in-up', 'slide-right-left'
        backdropClickToClose: false,
        focusFirstInput: true
      });

      console.log('Criou o modal.');

      $scope.hideModal = function() {
        $scope.modalCtrl.hide();
      };

      $scope.applyModal = function() {
        console.log('modal', $scope);
        $scope.modalCtrl.remove();
      };


      /*****************/
      ////// Termina o controller ainda dentro do alaSQL (porque ele está async?)


    }).catch(function(err) { // NÃO ENCONTROU O LOCAL

      PopUps.erroConsultar("Bens não encontrados!");
    });


  /*****************************************************************************/


});
