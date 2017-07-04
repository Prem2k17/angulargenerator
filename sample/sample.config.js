(function ()
{
    'use strict';
    
    angular
        .module(<%= modulename %>)
        .config(<%= configfunctionname %>);

    function <%= configfunctionname %>($stateProvider){
        
    	/*Inject UI-Router module for using $stateprovider*/
    	  $stateProvider  	        
      	.state(<%= modulename %>, {
            url: "/<%= name %>",      
            views    : {
                'root@'                      : {
                    templateUrl: 'modules/<%= name %>/<%= name %>.html',
                    controller : '<%= controllername %> as vm'
                }
            },          
            data: {pageTitle: '<%= name %>'}
          });
    }

})();