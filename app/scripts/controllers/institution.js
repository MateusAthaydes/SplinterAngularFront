'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:InstitutionCtrl
 * @description
 * # InstitutionCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('InstitutionCtrl', function ($scope, $window, institutionService, Url) {

    $scope.institution = {
        id: null,
        sigla: null,
        nome: null,
        site: null,
        privado: false
    }

    $scope.institutions = [];

    $scope.init = function(){
    	$scope.showInstitutions = true;
    	var instService = institutionService.getInstitutions($scope.institution.id,
                                            $scope.institution.sigla, $scope.institution.nome,
                                            $scope.institution.site, $scope.institution.privado);
    	instService.then(function (institutionResponse){
			$scope.institutions = institutionResponse.institutions;
    	});
    }

    $scope.showNewInstitutionForm = function(){
      	$scope.showInstitutions = !$scope.showInstitutions;
        $scope.institution.privado = false;
        $scope.editForm = false;
    }

    $scope.createNewInstitution = function(){
      console.log($scope.institution);
      var instService = institutionService.createNewInstitution($scope.institution)
      instService.then(function (objSuccess){
        alert("Instituição salva!");
        $window.location.reload();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      })
    }

    $scope.editInstitutionForm = function(institution){
      $scope.institution = institution;
      $scope.showInstitutions = false;
      $scope.editForm = true;
    }

    $scope.editInstitution = function(){
      var instService = institutionService.editInstitution($scope.institution)
      instService.then(function (objSuccess){
        alert("Instituição salva!");
          $window.location.reload();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      });
    }

    $scope.deleteInstitution = function(institution){
      console.log(institution);
      var instService = institutionService.deleteInstitution(institution);
      $window.location.reload();
    }

  });
