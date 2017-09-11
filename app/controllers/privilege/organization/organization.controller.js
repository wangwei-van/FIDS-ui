'use strict';

angular.module('com.app').controller('PrivilegeOrganizationCtrl', function ($rootScope, $q, $uibModal, api, toastr, dialog, PrivilegeService) {
  var vm = this;

  var privilegeBC = api.breadCrumbMap.privilege;
  vm.breadCrumbArr = [privilegeBC.root, privilegeBC.organization.root];

  vm.searchObject = {
    searchKeywords: ''
  }

  vm.refreshTable = function () {
    vm.searchObject.timestamp = new Date();
  }

  vm.organizations = [];
  vm.loading = true;
  vm.getOrganizationList = function (tableState) {
    var tableParams = {
      "pageSize": tableState.pagination.number,
      "pageNum": Math.floor(tableState.pagination.start / tableState.pagination.number) + 1,
    }
    vm.loading = true;
    PrivilegeService.getOrganizationList(tableParams, vm.searchObject.searchKeywords).then(function (response) {
      vm.loading = false;
      if (response.data.success) {
        vm.organizations = response.data.entity.list;
        vm.total = response.data.entity.total;
        tableState.pagination.numberOfPages = response.data.entity.pages;
      } else {
        vm.total = 0;
        toastr.error(response.data.message);
      }
    }).catch(function (err) {
      vm.loading = false;
      toastr.error(err.data.message);
    });
  }

  vm.create = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      size: 'md',
      backdrop: 'static',
      templateUrl: 'controllers/privilege/organization/create/create.html',
      controller: 'PrivilegeOrganizationCreateCtrl as vm'
    });

    modalInstance.result.then(function () {
      vm.refreshTable();
      toastr.success("部门创建成功！");
    })
  }

  vm.edit = function (organization) {
    var modalInstance = $uibModal.open({
      animation: true,
      size: 'md',
      backdrop: 'static',
      templateUrl: 'controllers/privilege/organization/edit/edit.html',
      controller: 'PrivilegeOrganizationEditCtrl as vm',
      resolve: {
        organization: function () { return organization; }
      }
    });

    modalInstance.result.then(function () {
      vm.refreshTable();
      toastr.success("角色信息修改成功！");
    })
  }

  vm.delete = function (organization) {
    var result = dialog.confirm('确认删除角色 ' + organization.name + ' ?');
    result.then(function (res) {
      if (res) {
        PrivilegeService.deleteOrganization(organization.id).then(function (response) {
          if (response.data.success) {
            vm.refreshTable();
            toastr.success('部门删除成功！');
          } else {
            toastr.error(response.data.message);
          }
        }).catch(function (error) {
          toastr.error(error.data.message)
        });
      }
    })
  }


})
