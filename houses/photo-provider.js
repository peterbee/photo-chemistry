chemistry.service('PhotoProvider', ['$http', '$q', function($http, $q) {
    function Provider() {};

    Provider.prototype.load = function load() {
        var self = this;

        if (!self.deferred) {
            self.deferred = $q.defer();

            $http.get('http://riskimo.mooo.com/house-images/50')
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
