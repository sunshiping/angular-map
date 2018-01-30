angular.module('fangxin.factory',[]).factory('ConfigService', function ($http) {
  return {
    getConfig: function () {
      return $http.get('/api/common-config.js');
    }
  }
});