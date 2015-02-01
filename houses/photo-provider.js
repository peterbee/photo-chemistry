chemistry.service('PhotoProvider', [function() {
    return [
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
                    src: '//placehold.it/500x300&text=House A-1'
                },
                {
                    parent: 'A',
                    name: 'Photo 2',
                    src: '//placehold.it/500x300&text=House A-2'
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
                    src: '//placehold.it/500x300&text=House B-1'
                },
                {
                    parent: 'B',
                    name: 'Photo 2',
                    src: '//placehold.it/500x300&text=House B-2'
                }
            ]
        }
    ]
}]);
