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

.controller('BrowseCtrl', function($scope, $state, $http, $q, $sce) {
  $scope.init = function(term){
    
    $scope.getLinks(term)
    .then(function(res){
      //success
      $scope.links = res.data.children;
      console.log('Links: ', res);
      $scope.getCorrectUrls();
    }, function(status){
      //err
      $scope.pageError = status;
    });
  };

  $scope.getLinks = function(term){
    var defer = $q.defer();
    $http.get('https://www.reddit.com/r/' + term + '/hot.json')
    .success(function(res){
      defer.resolve(res);
    })
    .error(function(status, err){
      console.log('Error in getLinks');
      defer.reject(status);
    });

    return defer.promise;
  };

  $scope.getType = function(url){

    var reImage = /(img|png|jpg)$/;
    var reVideo = /(gif|gifv|mp4|webm)$/;
    var reYoutube = /youtu/;

    console.log('checking extensions');

    if(url.match(reImage) !== null){
      console.log(url + ' is een plaatje');
      return 0;
    } else if(url.match(reVideo) !== null){
      console.log(url + ' is een video');
      return 1;
    } else if(url.match(reYoutube) !== null){
      console.log(url + ' is een youtube video');
      return 2;
    } else{
      console.log(url + ' is iets anders');
      return -1;
    }

    //returns: image-> 0, video -> 1, youtube -> 2, default -> error (-1)
  };

  $scope.getCorrectUrls = function(){
    $scope.urls = [];

    for(var i = 0; i < $scope.links.length; i++){

      $scope.urls[i] = $scope.links[i].data.url;

      //var newUrl = $scope.urls[i].replace(/(gifv|gif)$/, 'webm');
      var newUrl = $scope.urls[i].replace(/gifv$/, 'mp4');

      $scope.urls[i] = newUrl;

      if($scope.urls[i] !== undefined && $scope.urls[i].startsWith("http://")){

        $scope.urls[i] = "https://" + $scope.urls[i].substring(7);
      }
    }
  };

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

  //$scope.init();
});
