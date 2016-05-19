'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('QuestionCtrl', function ($scope, $window, $uibModal, $routeParams, questionService) {
    $scope.alternative = {
      id: null,
      id_questao: null,
      descricao: null,
      alternativa_correta: null,
    }

    $scope.question = {
      id: null,
      descricao: null,
      id_concurso: null,
      id_area_conhecimento: null,
      numero_acertos: null,
      numero_erros: null
    }

    $scope.alternatives = [];

    $scope.init = function(){
      $scope.question.id = $routeParams.id;
      var questService = questionService.getQuestion($scope.question.id, $scope.question.descricao, $scope.question.id_concurso,
                                            $scope.question.id_area_conhecimento, $scope.question.numero_acertos,
                                            $scope.question.numero_acertos);
      questService.then(function (questionResponse){
        $scope.question = questionResponse;
      });

      questService = questionService.getAlternatives($scope.alternative.id, $scope.question.id,
                                                  $scope.alternative.descricao, $scope.alternative.alternativa_correta);
      questService.then(function (alternativesResponse){
        $scope.alternatives = alternativesResponse.Alternatives;
      });
    }

    $scope.createNewAlternative = function(){
      console.log($scope.alternative);
      var questService = questionService.createNewAlternative($scope.alternative)
      questService.then(function (objSuccess){
        $scope.questionModal.close();
        $window.location.reload();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      });
    }

    $scope.deleteAlternative = function(){
      var questService = questionService.deleteAlternative($scope.alternative);
      $window.location.reload();
    }

    /*
    ----------------------------------------------------------------------------
    Modal configuration
    * create and edit modal;
    * confirmation modal;
    */

    $scope.openAlternativeModal = function(){
        $scope.modalTitle = "Nova Alternativa";
        $scope.alternative.id_questao = $scope.question.id
        $scope.alternative.alternativa_correta = false;
        $scope.questionModal = $uibModal.open({
          templateUrl: '/views/mf_alternative.html',
          scope: $scope,
        });
    }

    $scope.closeModal = function(){
      $scope.questionModal.dismiss('cancel');
    }

    $scope.openConfirmationModal = function (alternative){
      $scope.alternative = alternative;
      $scope.modalTitle = "Excluir Alternativa";
      $scope.modalMessage = "Você tem certeza que deseja excluir essa Alternativa?"
      $scope.confirmationModal = $uibModal.open({
        templateUrl: '/views/confirmation_modal.html',
        scope: $scope
      })
    }

    $scope.confirm = function(){
      $scope.confirmationModal.close();
      $scope.deleteAlternative();
    }

    $scope.closeConfirmationModal = function(){
      $scope.confirmationModal.dismiss('cancel');
    }

  });
