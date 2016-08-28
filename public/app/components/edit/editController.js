app.controller("EditController", ['$scope','clientPromise','$http','$state',
    function($scope,clientPromise,$http,$state){
        $scope.name = clientPromise.data.name;
        $scope.email = clientPromise.data.email;
        $scope.address = clientPromise.data.address;
        $scope.phone = clientPromise.data.phone;
        $scope.update = function(){
            var updatedData = {
                id:clientPromise.data._id,
                name:$scope.name,
                email:$scope.email,
                address:$scope.address,
                phone:$scope.phone};
            $http.post('/edit',updatedData).success(function(data){
                $state.go('client',{id:clientPromise.data._id});
            });
        };
}]);