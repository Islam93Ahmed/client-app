app.config(['$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider.state('home', {
            url: '/home',
            templateUrl:'/app/components/main/mainView.html',
            controller:'MainController',
            resolve: {
                postPromise: ['clients', function(clients){
                    clientLimit = 15;
                  return clients.getAll();
                }]
              }
        }).state('client', {
            url:'/client/{id}',
            templateUrl:'/app/components/client/clientView.html',
            controller:'ClientController',
            resolve:{
                clientPromise:function($http, $stateParams){
                        return $http.get('/client/'+$stateParams.id);
                    }
            }
        }).state('editClient', {
            url:'/editClient/{id}',
            templateUrl:'/app/components/edit/editView.html',
            controller:'EditController',
            resolve:{
                clientPromise:function($http, $stateParams){
                        return $http.get('/client/'+$stateParams.id)
                    }
            }
        });
        $urlRouterProvider.otherwise('home');
    }
]);