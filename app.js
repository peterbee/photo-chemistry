var chemistry = angular.module('chemistry',[]);

chemistry.run(function($document, $rootScope){
    $document.bind('keyup', function(e) {
        $rootScope.$broadcast('key', e);
    });
  })

chemistry.controller('CompareCtrl', ['$scope', 'Photos', function($scope, Photos) {
    Photos.load().then(function(data) {
        var parents = data;
        var scopeParents = [];

        function showRandomPhotos() {
            var scopePhotos = [];
            var scopeParent = parents.slice();

            if(parents.length < 2) {
                alert('Not enough items to compare.');
                return;
            }

            for(var i = 0; i < 2; i++) {
                var randomParent = scopeParent.splice([Math.floor(Math.random() * scopeParent.length)],1)[0];
                scopeParents[i] = randomParent;
                var randomPhoto = randomParent.photos[Math.floor(Math.random() * randomParent.photos.length)];
                scopePhotos.push(randomPhoto);
            }

            $scope.photo1 = scopePhotos[0];
            $scope.photo2 = scopePhotos[1];
        }

        $scope.click = function click(id) {
            var parent = scopeParents[id];
            Photos.select(parent.id);

            for(var i in scopeParents) {
                var parent = scopeParents[i];
                Photos.show(parent.id);
                parent.ratio = Photos.getRatio(parent.id);
            }

            showRandomPhotos();

            Photos.save();
        }

        $scope.$on('key', function key(event, e) {
            if (e.which == 37) {
                // left arrow
                $scope.click(0);
            }
            else if (e.which == 39) {
                // right arrow
                $scope.click(1);
            }

            // Force update to DOM
            $scope.$apply();
        })

        // initialize view
        showRandomPhotos();
    });
}]);

chemistry.controller('ListCtrl', ['$scope', 'Photos', function($scope, Photos) {
    Photos.load().then(function(data) {
        $scope.parents = data;
    });
}]);

chemistry.service('Photos', ['PhotoProvider', function(PhotoProvider) {
    function Photos() {
        this.results = {};
    };

    Photos.prototype.show = function select(id1, id2) {
        this.getResults(id1).exposures++;
        this.getResults(id2).exposures++;
    };

    Photos.prototype.select = function select(id) {
        this.getResults(id).clicks++;
    };

    Photos.prototype.getRatio = function select(id) {
        var result = this.getResults(id);
        return result.exposures ? result.clicks / result.exposures : 0;
    };

    Photos.prototype.getResults = function getResults(id) {
        if(!this.results[id]) this.results[id] = { clicks: 0, exposures: 0 };
        return this.results[id];
    };

    Photos.prototype.save = function save() {
        if(typeof(Storage) !== "undefined") {
            localStorage.chemistryData = JSON.stringify(this.results);
        } else {
            alert('No local storage.  Cannot save data!');
        }
    };

    Photos.prototype.load = function load() {
        var self = this;

        return PhotoProvider.load().then(function (data) {
            self.data = data;

            for(var i in self.data) {
                self.data[i].ratio = self.getRatio(self.data[i].id);
            }
            return self.data;
        });
    }

    // Load persisted data
    var photos = new Photos();
    if(typeof(Storage) !== "undefined") {
        if(localStorage.chemistryData) {
            photos.results = JSON.parse(localStorage.chemistryData);
        }
    }

    return photos;

}]);
