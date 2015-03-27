angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('BrowseCtrl', function($scope, $state, $http, $q) {
  $scope.init = function(){
    
    $scope.getLinks()
    .then(function(res){
      //success
      console.log('Links: ', res);
      $scope.links = res.data.children;
    }, function(status){
      //err
      $scope.pageError = status;
    })
  }

  $scope.getLinks = function(){
    var defer = $q.defer();

    $http.get('https://www.reddit.com/r/gifs/hot.json')
    .success(function(res){
      //console.log('Succes in getLinks');
      defer.resolve(res)
    })
    .error(function(status, err){
      //console.log('Error in getLinks');
      defer.reject(status);
    })

    return defer.promise;
  }

  $scope.init();

})

;
