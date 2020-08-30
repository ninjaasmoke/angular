(function () {
    'use strict';
    angular.module('common', [])
        .constant('APIBasePath', 'https://aleksandar-gjorgievski.herokuapp.com/')
        .config(config);
    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('loadingHttpInterceptor');
    }
})();
