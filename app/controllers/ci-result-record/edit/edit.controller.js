'use strict';

angular.module('com.app').controller('RecordCiResultCtrl', function ($uibModalInstance, SampleService, toastr, checkItems) {
  var vm = this;

  vm.resultArr = ['合格', '不合格'];
  vm.checkItem = angular.copy(checkItems[0]);
  vm.checkItem.itemResult = vm.resultArr[0];

  vm.ok = function () {
    var data = angular.copy(checkItems);
    angular.forEach(data, function (item) {
      angular.merge(item, {
        measuredValue: vm.checkItem.measuredValue,
        itemResult: vm.checkItem.itemResult,
        status: 2
      });
    });
    SampleService.batchRecordCiResult(data).then(function (response) {
  		if (response.data.success) {
		  	$uibModalInstance.close();
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
