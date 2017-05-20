# Angular UI-Router-History
Angular UI Router does not provide support to back and fourth state. So to Maintain Back and Fourth State in UI Router you would have to use this factory to get back and forth state.

# Prerequisite

-> you must have to install/setup ui router before injecting _routerHistory service 
  So it will need angular-ui-router.js
  
# Get it started
Steps -
======

1) To Initiate App first include "ui.router.history" module in your main application module

angular.module("RoutesApp", ['ui.router', 'ui.router.history'])

2) Save each your states in $stateChangeSuccess before you switch to another state

$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    // saving all current states
    _routerHistory.saveState(toState, toParams);
});

3) To refresh/reset _routerHistory factory on re-initialization of your application put below code in .run block

app.run(['$rootScope' ,'$state', '_routerHistory', function($rootScope, $state, _routerHistory){
  _routerHistory.clearHistory();
  
  //below your rest of the events
  $rootScope.$on('$stateChangeSuccess', function(){......});
}]);

4) Inject _routerHistory factory to your controller where you want to use this service 

app.controller('HistoryCtrl', ['$scope', '_routerHistory', function($scope, _routerHistory){
    // to go back through _routerHistory service then call 
    _routerHistory.goBackState();
}]);

