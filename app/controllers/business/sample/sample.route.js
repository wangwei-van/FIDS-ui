'use strict';

angular.module('com.app').config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.business.sample', {
		url: '/sample',
		templateUrl: 'controllers/business/sample/sample.html',
		controller: 'SampleCtrl as vm'
	});

	$stateProvider.state('app.business.sample.create', {
		url: '/create',
		views: {
			'@app.business': {
				templateUrl: 'controllers/business/sample/create/create.html',
				controller: 'SampleCreateCtrl as vm'
			}
		},
		resolve: {
			users: ['$rootScope', '$q', 'PrivilegeService', 'toastr', function ($rootScope, $q, PrivilegeService, toastr) {
				var deferred = $q.defer();
				$rootScope.loading = true;
				PrivilegeService.getUserList().then(function (response) {
					$rootScope.loading = false;
					if (response.data.success) {
						var res = [];
						angular.forEach(response.data.entity.list, function (user) {
							res.push(user.name);
						});
						deferred.resolve(res);
					} else {
						toastr.error(response.data.message);
					}
				}).catch(function (err) {
					$rootScope.loading = false;
					toastr.error(err.data);
				});
				return deferred.promise;
			}]
		}
	});

	$stateProvider.state('app.business.sample.detail', {
		url: '/{:id}',
		views: {
			'@app.business': {
				templateUrl: 'controllers/business/sample/detail/detail.html',
				controller: 'SampleDetailCtrl as vm'
			}
		},
		abstract: true
	});

	$stateProvider.state('app.business.sample.detail.info', {
		url: '/info',
		templateUrl: 'controllers/business/sample/detail/info/info.html',
		controller: 'SampleDetailInfoCtrl as vm',
		resolve: {
			users: ['$rootScope', '$q', 'PrivilegeService', 'toastr', function ($rootScope, $q, PrivilegeService, toastr) {
				var deferred = $q.defer();
				$rootScope.loading = true;
				PrivilegeService.getUserList().then(function (response) {
					$rootScope.loading = false;
					if (response.data.success) {
						var res = [];
						angular.forEach(response.data.entity.list, function (user) {
							res.push(user.name);
						});
						deferred.resolve(res);
					} else {
						toastr.error(response.data.message);
					}
				}).catch(function (err) {
					$rootScope.loading = false;
					toastr.error(err.data);
				});
				return deferred.promise;
			}]
		}
	});

	$stateProvider.state('app.business.sample.detail.ci', {
		url: '/ci',
		templateUrl: 'controllers/business/sample/detail/ci/ci.html',
		controller: 'SampleDetailCiCtrl as vm'
	});
});
