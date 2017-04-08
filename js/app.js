// RSS News Article Feed App

var app = angular.module('newsArticles', []);

'use strict';

app.controller('DateCtrl', ['$scope', function($scope) {
  // Current date
  $scope.date = new Date();
}]);

app.controller('ArticlesCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.title = "Latest News Articles";
  $scope.articleLoadButton = "Choose News Feed";

  $scope.loadArticles = function(e, url) {
    $scope.articleLoadButton = angular.element(e.target).text();

    // RSS to JSON converter API
    $http({
      url: 'https://api.rss2json.com/v1/api.json',
      method: 'GET',
      dataType: 'json',
      params: {
        rss_url: url
      }
    }).then(function successCallback(response) {
      $scope.articles = response.data.items;
    }, function errorCallback(response) {
      alert('Sorry, there was a problem loading the news feed.');
    });
  }

  // Limit number of articles in view
  $scope.viewLimit = 5;
  $scope.viewMore = function(num) {
    $scope.viewLimit += num;
  }
}]);

// Date format filter
app.filter('dateFormat', function dateFormat($filter) {
  return function(text) {
    var newDate = new Date(text.replace(/-/g, '/'));
    return $filter('date')(newDate, 'longDate');
  }
});
