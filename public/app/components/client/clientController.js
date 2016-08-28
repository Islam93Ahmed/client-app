app.controller("ClientController", ['$scope','clients', '$stateParams','clientPromise',
    function($scope,clients,$stateParams, clientPromise){
        $scope.client = clientPromise.data;
}]);