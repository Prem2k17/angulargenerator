'use strict';

const gulp = require('gulp');
const template = require('gulp-template');
const prompt = require('gulp-prompt');
const data = require('gulp-data');
var file = require('gulp-file');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2));

gulp.task('generate', function () {

	
	gulp.src('*')
	.pipe(prompt.prompt([{
		type: 'input',
		name: 'rootFolder',		
		message: 'Your root app folder (if any)?'
	},
	{
		type: 'input',
		name: 'modulesFolder',
		message: 'Your modules folder (if any)?'
	}], function(res){
		//value is in res.first and res.second
		console.log(res.rootFolder);
		console.log(res.modulesFolder);
		var rootFolder = res.rootFolder;
		var modulesFolder = res.modulesFolder;
    var destPath = "";

		if(rootFolder && modulesFolder){
			destPath = rootFolder+'/'+modulesFolder+'/'+options.module;
		}
		else if(rootFolder){
			destPath = rootFolder+'/'+options.module;
		}
		else if(modulesFolder){
			destPath = +modulesFolder+'/'+options.module;
		}
		else{
			destPath = options.module;
		}		
		
		if(options.module){		
			  file(options.module+'.html', '<!-- Add your HTML codes here -->\n<h1>Hello <%= name %></h1>' , {src: true})		   
				.pipe(data(() => ({name: options.module})))
				.pipe(template())			
				.pipe(gulp.dest(destPath))			
			  
			  file(options.module+'.module.js', '(function ()\r\n{\r\n    \'use strict\';    \r\n    angular\r\n        .module(<%= name %>, [\r\n        \r\n            \/**Core Plugin modules here*\/\r\n           \r\n            \r\n            \/**Application Modules added here**\/\r\n          \r\n\r\n        ])\r\n})();' , {src: true})
				.pipe(data(() => ({name: "'"+options.module+"'"})))
				.pipe(template())			
				.pipe(gulp.dest(destPath))
				
			  file(options.module+'.config.js', '(function ()\r\n{\r\n    \'use strict\';\r\n    \r\n    angular\r\n        .module(<%= modulename %>)\r\n        .config(<%= configfunctionname %>);\r\n\r\n    function <%= configfunctionname %>($stateProvider){\r\n        \r\n    \t\/*Inject UI-Router module for using $stateprovider*\/\r\n    \t  $stateProvider  \t        \r\n      \t.state(<%= modulename %>, {\r\n            url: \"\/<%= name %>\",      \r\n            views    : {\r\n                \'root@\'                      : {\r\n                    templateUrl: \'modules\/<%= name %>\/<%= name %>.html\',\r\n                    controller : \'<%= controllername %> as vm\'\r\n                }\r\n            },          \r\n            data: {pageTitle: \'<%= name %>\'}\r\n          });\r\n    }\r\n\r\n})();' , {src: true})
				.pipe(data(() => ({name:options.module,modulename: "'"+options.module+"'",controllername:options.module+'Controller',configfunctionname:options.module+'Config'})))
				.pipe(template())			
				.pipe(gulp.dest(destPath))
				
			  file(options.module+'.controller.js', '(function() {\r\n\t\'use strict\';\r\n\r\n\tangular.module(<%= modulename %>)\r\n\t.controller(\'<%= name %>Controller\', <%= name %>Controller);\r\n\r\n\tfunction <%= name %>Controller() {\r\n\t\tvar vm = this;\r\n\t\t\r\n\t\t\/*Add your controller codes here*\/\r\n\t\t\r\n\t}\r\n\r\n})();\r\n' , {src: true})
				.pipe(data(() => ({name:options.module,modulename: "'"+options.module+"'"})))
				.pipe(template())			
				.pipe(gulp.dest(destPath))
				
			  file(options.module+'.css', '/* <%= name %> module styles added here */' , {src: true})
				.pipe(data(() => ({name: options.module})))
				.pipe(template())			
				.pipe(gulp.dest(destPath))
				
			  console.log('Module "'+options.module+'" created Successfully..');
		}	
		
	}));
		
});