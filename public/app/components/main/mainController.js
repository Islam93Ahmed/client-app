var clientLimit = 15;

app.controller("MainController",['$scope', 'clients', function($scope, clients){

    $scope.clients = clients.clients;
    $scope.addClient = function(){
        if(!$scope.name || $scope.name === '') { return; }
        clients.create({name:$scope.name,
                email:$scope.email,
                address:$scope.address,
                phone:$scope.phone});
        $scope.name = '';
        $scope.email = '';
        $scope.address = '';
        $scope.phone = '';
    };
    $scope.removeClient = function(id){
        clients.remove(id);
    };
    $scope.search = function(){
        //console.log("From controller => " + $scope.searchValue);
        if(!$scope.searchValue || $scope.searchValue === '') { clients.getAll(); }
        clients.getClients($scope.searchValue);
    };
    $scope.getMoreClients = function(){
        console.log(clientLimit);
        clientLimit += 5;
        clients.getAll();
    };

}]);