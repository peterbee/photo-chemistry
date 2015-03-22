chemistry.service('PhotoProvider', ['$http', '$q', '$location', function($http, $q, $location) {

    var rpcEndpoint = 'http://dubdub.jakegub.com:10000/rpc';

    function Provider() {};

    function jsonRpc (method, parameters, config){
        var data = {"jsonrpc": "2.0", "method": method, "params": parameters, "id" : 1};
        return $http.post(rpcEndpoint, data, angular.extend({'headers':{'Content-Type': 'application/json'}}, config) );
    };

    Provider.prototype.load = function load() {
        var self = this;

        var params = {
            p_limit: 8,
            p_zip: "80220",
            p_zipMeters: 32000,
            p_minPrice: 100000,
            p_maxPrice: 417000
        }

        var userParams = $location.search();

        angular.extend(params, userParams);

        if (!self.deferred) {
            self.deferred = $q.defer();

            var method = 'PhotoChem.GetListings';
            var parameters = {
                limit: Number(params.p_limit),
                zip: params.p_zip,
                "zip-meters": Number(params.p_zipMeters),
                minPrice: Number(params.p_minPrice),
                maxPrice: Number(params.p_maxPrice)
            };

            jsonRpc(method, parameters)
                .success(function(data) {
                    self.deferred.resolve(data.result.listings);
                })
                .error(function(data, status, headers, config) {
                    console.error('JSON RPC Error', data, status, headers, config);
                    self.deferred.refect(data);
                });
        }

        return self.deferred.promise;
    }

    return new Provider();
}]);
