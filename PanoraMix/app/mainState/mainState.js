myApp.factory('MarkerCreatorService', function () {

    var mId = 0;

    function create(latitude, longitude) {
        var mark = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'
            },
            latitude: latitude,
            longitude: longitude,
            id: ++mId
        };
        return mark;
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    return {
        createByCoords: createByCoords
    };

});

myApp.controller('MapCtrl', function (MarkerCreatorService, $scope, $rootScope) {

    MarkerCreatorService.createByCoords(30.454018, -3.509205, function (marker) {
        marker.options.labelContent = 'Autentia';
        $scope.autentiaMarker = marker;
    });

    $scope.map = {
        center: {
            latitude: $scope.autentiaMarker.latitude,
            longitude: $scope.autentiaMarker.longitude
        },
        zoom: 12,
        markers: [],
        control: {},
        options: {
            scrollwheel: false
        }
    };

    $scope.map.markers.push($scope.autentiaMarker);

    function refresh(marker) {
        $scope.map.control.refresh({latitude: marker.latitude,
            longitude: marker.longitude});
    }

    $rootScope.$watch('in', function() {
        console.log("Refresh?");
        if($rootScope.in==0){
            MarkerCreatorService.createByCoords(40.7115108, -73.9982204, function (marker) {
                $scope.autentiaMarker = marker;
            });
            refresh($scope.autentiaMarker);
        }else if($rootScope.in == 1){
            MarkerCreatorService.createByCoords(-31.9546529, 115.852662, function (marker) {
                $scope.autentiaMarker = marker;
            });
            refresh($scope.autentiaMarker);
        }else if($rootScope.in == 2){
            MarkerCreatorService.createByCoords(49.2111266, -2.1326328, function (marker) {
                $scope.autentiaMarker = marker;
            });
            refresh($scope.autentiaMarker);
        }

    });

});