myApp.controller('state1Ctrl', function ($scope, $location, $state, $firebase) {
    $scope.newCategory = null;
    $scope.categories= null;
    $scope.imageUrl = null;
    var ref = new Firebase("https://panoramix.firebaseio.com/categories");
    var sync = $firebase(ref);
    var syncObject = sync.$asObject();
    syncObject.$bindTo($scope, 'categories');

    var authData = ref.getAuth();
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        $state.go("mainState")
        console.log("User is logged out");
    }

    $scope.addCategory = function () {
        ref.push({
            name: $scope.newCategory,
            selected: false
        });
    }
    $scope.removeCategory = function (index) {
        var newRef = ref.child(index);
        newRef.remove();
    }

    $scope.addImage = function (cat) {
        if (cat.images == undefined)
            cat.images = [];
        cat.images.push({url: "test"});
        console.log($scope.imageUrl);
    }
});