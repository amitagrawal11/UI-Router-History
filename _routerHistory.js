angular.module('ui.router.history', ['ui.router'])
	.factory('_routerHistory', [ '$state', function($state){
		var history = [];
		var backHistory = [];
		var forwardHistory = [];
		var currentState = {};

		return {
			saveCurrentState:function(state, params){
				console.log('current state: '+ state.name);
				currentState = { state: state, params: params};
			},
			saveState: function(state, params){
				var isStateExists = backHistory.find(function(history){ return state.name == history.state.name });
				if(!isStateExists){
					console.log('saving state: '+ state.name);
					backHistory.push({ state: state, params: params });		
				}
			},
			removeBackState: function(){
				var back = backHistory.pop();
				forwardHistory.push(back);
				return backHistory[backHistory.length - 1]; // return n-1 object or prev state
			},
			removeForwardState: function(){
				var forward = forwardHistory.pop();
				backHistory.push(forward);
				return forward;
			},
			goBackState: function(){
				var backState = this.removeBackState();
				this.goToState(backState);
			},
			goForwardState: function(){
				var forwardState = this.removeForwardState();
				this.goToState(forwardState);
			},
			goToState: function(state){
				$state.go(state.state.name, state.params, { reload: true});	
			},
			clearHistory: function(){
				history = [];
				backHistory = []; 
				forwardHistory = [];
			},
			isBackHistory: function(){
				return backHistory.length > 1; // 1 since we store current state into back 
			},
			isForwardHistory: function(){
				return forwardHistory.length > 0;
			}
		};
	}]);
