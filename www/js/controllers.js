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

    console.log('Init called' + term);
    
    $scope.getLinks(term)
    .then(function(res){
      //success
      console.log('Links: ', res);
      $scope.links = res.data.children;
      $scope.getCorrectUrls();
    }, function(status){
      //err
      $scope.pageError = status;
    });
  };

  $scope.getLinks = function(term){
    var defer = $q.defer();
    //console.log(searchTerm2 + 'in getLinks');
    $http.get('https://www.reddit.com/r/' + term + '/hot.json')
    .success(function(res){
      console.log('Succes in getLinks');
      defer.resolve(res);
    })
    .error(function(status, err){
      console.log('Error in getLinks');
      defer.reject(status);
    });

    return defer.promise;
  };

  $scope.getType = function(ext){
    if (ext[0] == '.'){
      ext = ext.substring(ext.length - 3);
    }

    //returns: image-> 0, video -> 1, default -> error (-1)
    switch(ext){
      case "img":
      case "png":
      case "jpg":
        return 0;
      case "gif":
      case "gifv":
      case "mp4":
      case "webm":
        return 1;
      default:
        return -1;
    }
  };

  $scope.getCorrectUrls = function(){
    $scope.urls = [];

    for(var i = 0; i < $scope.links.length; i++){

      $scope.urls[i] = $scope.links[i].data.url;

      if($scope.urls[i] !== undefined && $scope.urls[i].substring($scope.urls[i].length - 4) == "gifv"){

        var newWord = "webm";

        for(var j = $scope.urls[i].length - 4; j < $scope.urls[i].length; j++)
        {
          $scope.urls[i][j] = newWord[j - $scope.urls[i].length + 4];
        }

        console.log($scope.links[i].url);

      }
      if($scope.urls[i] !== undefined && $scope.urls[i].startsWith("http://")){

        $scope.urls[i] = "https://" + $scope.urls[i].substring(7);

      }
    }
  };

  // $scope.getCorrectUrls = function(){

  //   for(var i = 0; i < $scope.links[i].length; i++){

  //     if($scope.links[i].data.url !== undefined && $scope.links[i].data.url.substring($scope.links[i].data.url.length - 4) == "gifv"){

  //       var newWord = "webm";

  //       for(var j = $scope.links[i].data.url.length - 4; j < $scope.links[i].data.url.length; j++)
  //       {
  //         $scope.links[i].data.url[j] = newWord[j - $scope.links[i].data.url.length + 4];
  //       }

  //       console.log($scope.links[i].data.url);

  //     }
  //     if($scope.links[i].data.url !== undefined && $scope.links[i].data.url.startsWith("http://")){

  //       $scope.links[i].data.url = "https://" + $scope.links[i].data.url.substring(7);

  //     }
  //   }
  // };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  //$scope.init();

});
