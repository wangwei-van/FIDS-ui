'use strict';

angular.module('com.app').controller('ContractDetailSampleCtrl', function ($scope, ContractService) {
  var vm = this;

  $scope.$emit('refreshContract');
  $scope.$on('contractInfo', function (event, contract) {
  	vm.contract = contract;
  })

});
