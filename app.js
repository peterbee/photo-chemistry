var chemistry = angular.module('chemistry',[]);

chemistry.controller('CompareCtrl', ['$scope', 'Photos', function($scope, Photos) {
    var parents = Photos.data;
    var scopeParents = [];

    function showRandomPhotos() {
        var scopePhotos = [];
        var scopeParent = parents.slice();

        if(parents.length < 2) {
            alert('Not enough items to compare.');
            return;
        }

        while (scopePhotos.length < 2) {
            var randomParent = scopeParent.splice([Math.floor(Math.random() * scopeParent.length)],1)[0];

            if (randomParent == null) {
                scopeParent = parents.slice();
                continue;
            }

            scopeParents[scopePhotos.length] = randomParent;
            var randomPhoto = randomParent.photos[Math.floor(Math.random() * randomParent.photos.length)];

            if ( (scopePhotos.length == 1) && (scopePhotos[0].tag != randomPhoto.tag) )
                continue;

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

    // initialize view
    showRandomPhotos();
}]);

chemistry.controller('ListCtrl', ['$scope', 'Photos', function($scope, Photos) {
    $scope.parents = Photos.data;
}]);

chemistry.service('Photos', ['PhotoProvider', function(PhotoProvider) {
    function Photos() {
        this.data = PhotoProvider;
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

    // Load persisted data
    var photos = new Photos();
    if(typeof(Storage) !== "undefined") {
        if(localStorage.chemistryData) {
            photos.results = JSON.parse(localStorage.chemistryData);
        }
    }

    for(var i in photos.data) {
        photos.data[i].ratio = photos.getRatio(photos.data[i].id);
    }

    return photos;
}]);
