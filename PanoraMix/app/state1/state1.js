myApp.controller('state1Ctrl', function ($scope, $rootScope, $location, $state, $firebase) {
    $scope.newCategory = null;
    $scope.categories = null;
    $scope.imageUrl = [];
    $scope.searchText =null;

    var loginRef = new Firebase("https://panoramix.firebaseio.com/");
    var authData = loginRef.getAuth();
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        $state.go("mainState")
        console.log("User is logged out");
        console.log(authData);
    }
    if (authData !== null) {
        var ref = new Firebase("https://panoramix.firebaseio.com/ " + authData.uid + "/categories");
        var sync = $firebase(ref);
        var syncObject = sync.$asObject();
        syncObject.$bindTo($scope, 'categories');
    }

    $scope.addCategory = function () {
        ref.push({
            name: $scope.newCategory,
            selected: true
        });
        $scope.newCategory = null;
    }
    $scope.removeCategory = function (index) {
        console.log("Removing category...")
        var newRef = ref.child(index)
        console.log(index);
        newRef.remove();
        console.log("Removed");
    }

    $scope.addImage = function (cat, index) {
        if (cat.images == undefined)
            cat.images = [];
        if($scope.imageUrl[index]!=null) {
            cat.images.push({url: $scope.imageUrl[index]});
            $scope.imageUrl[index] = null;
            console.log($scope.imageUrl[index]);
        }
    }
})
;