chemistry.service('PhotoProvider', ['$http', '$q', function($http, $q) {
    function Provider() {};

    var testData = [
        {
            id: 5252,
            name: 'Item A',
            href: 'http://www.google.com/A',
            clicks: 0,
            exposures: 0,
            ratio: 0,
            photos: [
                {
                    parent: 'A',
                    name: 'Photo 1',
                    src: '//placehold.it/500x300&text=A-1'
                },
                {
                    parent: 'A',
                    name: 'Photo 2',
                    src: '//placehold.it/500x300&text=A-2'
                }
            ]
        },
        {
            id: 233334,
            name: 'Item B',
            href: 'http://www.google.com/B',
            clicks: 0,
            exposures: 0,
            ratio: 0,
            photos: [
                {
                    parent: 'B',
                    name: 'Photo 1',
                    src: '//placehold.it/500x300&text=B-1'
                },
                {
                    parent: 'B',
                    name: 'Photo 2',
                    src: '//placehold.it/500x300&text=B-2'
                }
            ]
        }
    ]

    Provider.prototype.load = function load() {
        var self = this;

        if (!self.deferred) {
            self.deferred = $q.defer();

            self.deferred.resolve(testData);
        }

        return self.deferred.promise;
    }

    return new Provider();
}]);
