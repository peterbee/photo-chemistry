chemistry.service('PhotoProvider', ['$http', '$q', '$location', function($http, $q, $location) {
    function Provider() {};

    var params = {
        p_limit: 20
    }

    var userParams = $location.search();

    angular.extend(params, userParams);

    Provider.prototype.load = function load() {
        var self = this;

        if (!self.deferred) {
            self.deferred = $q.defer();

            $http.get('http://riskimo.mooo.com/house-images/'+params.p_limit)
                .success(function(data, status, headers, config) {
                    self.deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    console.error('Http Error', data);
                    self.deferred.reject(data);
                });
        }

        return self.deferred.promise;
    }

    return new Provider();
}]);
