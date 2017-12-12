'use strict';

angular.module('com.app').controller('CiDistributeCtrl', function ($rootScope, $scope, $uibModalInstance, SampleService, PrivilegeService, sampleId, checkItems, departments) {
  var vm = this;
  $rootScope.loading = false;

  vm.checkItem = angular.copy(checkItems[0]);
  vm.departments = departments;


  vm.getDepartmentUsers = function () {
    PrivilegeService.getOrganizationUsers(vm.testRoomId).then(function (response) {
      if (response.data.success) {
        vm.users = response.data.entity;
        if (vm.users.length > 0) {
          vm.testUser = vm.users[0].name;
        }
      } else {
        vm.users = [];
      }
    })
  }


  if (vm.checkItem.testRoom) {
    angular.forEach(vm.departments, function (department) {
      if (department.name == vm.checkItem.testRoom) {
        vm.testRoomId = department.id;
        vm.getDepartmentUsers(vm.testRoomId);
      }
    })
  } else {
    vm.testRoomId = vm.departments[0].id;
  }

  vm.users = [];

  if (vm.testRoomId) {
    vm.getDepartmentUsers();
  }

  vm.ok = function () {
    var testRoom = '';
    angular.forEach(vm.departments, function (department) {
      if (department.id == vm.testRoomId) {
        testRoom = department.name;
      }
    })
    var data = angular.copy(checkItems);
    angular.forEach(data, function (item) {
    	angular.merge(item, {
    		testRoom: testRoom,
    		testUser: vm.testUser,
        status: 1
    	});
    })
  	SampleService.updateSampleCi(sampleId, data).then(function (response) {
  		if (response.data.success) {
		  	$uibModalInstance.close(vm.checkItem);
  		} else {
  			toastr.error(response.data.message);
  		}
  	}).catch(function (err) {
  		toastr.error(err.data);
  	})
  }

  vm.cancel = function () {
  	$uibModalInstance.dismiss();
  }
});