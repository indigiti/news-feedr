// RSS News Article Feed App

var app = angular.module('newsArticles', []);

'use strict';

app.controller('DateCtrl', ['$scope', function($scope) {
  // Current date
  $scope.date = new Date();
}]);

app.controller('ArticlesCtrl', ['$scope','ArticleService', function($scope, Article) {  
  $scope.title = "Latest News Articles";
  $scope.articleLoadButton = "Choose News Feed";

  $scope.loadArticles = function(e) {        
    Article.parseArticles($scope.feedSrc).then(function(res) {
      $scope.articleLoadButton = angular.element(e.target).text();
      $scope.articles = res.data.responseData.feed.entries;
      $("#no-articles-message").hide();
      $("#view-more-button").show();
    });
  }

  // Limit number of articles in view
  $scope.viewLimit = 5;
  $scope.viewMore = function(num) {
    $scope.viewLimit += num;
  }
}]);

app.factory('ArticleService',['$http', function($http) {
  return {
    parseArticles : function(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  }
}]);
