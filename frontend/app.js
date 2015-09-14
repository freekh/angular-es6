import angular from 'angular/angular'

const weatherApp = angular.module('WeatherApp', [])

weatherApp.controller('WeatherCtrl', ($scope, $http) => {
  $scope.$watch('cityInput', (cityInput) => {
    if (cityInput) {
      $http.get(`/city?name=${cityInput}`).then((response) => {
        const {open, yahoo} = response.data
        console.log(open, yahoo)
        $scope.message = null
        $scope.open = open
        $scope.yahoo = yahoo
        $scope.avg = (open + yahoo) / 2
      }).catch((err) => {
        $scope.message = `Could not get weather info for: ${cityInput}`
        $scope.open = null
        $scope.yahoo = null
        $scope.avg = null
      })
    } else {
      $scope.message = 'Write something - god damn you!'
    }
  })
})

export default weatherApp
