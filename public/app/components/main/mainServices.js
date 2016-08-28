app.factory('clients', ['$http',function($http){
    var obj = {clients:[]};
    obj.getAll = function(){
        return $http.get('/clients/'+clientLimit).success(function(data){
            angular.copy(data, obj.clients);
        });
    };

    obj.create = function(client){
        return $http.post('/clients', client).success(function(data){
            obj.clients.push(data);
        });
    };

    obj.remove = function(id){
        return $http.post('/remove',{id:id}).success(function(data){
            obj.getAll();
        });
    };

    obj.getClients = function(name){
        return $http.post('/search', {name:name}).success(function(data){
            //console.log("From after post => " + name);
            //console.log(data);
            angular.copy(data, obj.clients);
        });
    };

    return obj;
}]);
