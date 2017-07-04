'use strict';

const gulp = require('gulp');
const template = require('gulp-template');
const data = require('gulp-data');
const debug = require('gulp-debug');
const rename = require('gulp-rename');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2));

gulp.task('generate', function () {
	
	if(options.module){		
		  gulp.src('sample/sampletemplate.html')
			.pipe(data(() => ({name: options.module})))
			.pipe(template())			
			.pipe(rename(options.module+'.html'))
			.pipe(debug())
			.pipe(gulp.dest('app/modules/'+options.module))
			
		  gulp.src('sample/sample.module.js')
			.pipe(data(() => ({name: "'"+options.module+"'"})))
			.pipe(template())			
			.pipe(rename(options.module+'.module.js'))
			.pipe(debug())
			.pipe(gulp.dest('app/modules/'+options.module))
			
		  gulp.src('sample/sample.config.js')
			.pipe(data(() => ({name:options.module,modulename: "'"+options.module+"'",controllername:options.module+'Controller',configfunctionname:options.module+'Config'})))
			.pipe(template())			
			.pipe(rename(options.module+'.config.js'))
			.pipe(debug())
			.pipe(gulp.dest('app/modules/'+options.module))
			
		  gulp.src('sample/sample.controller.js')
			.pipe(data(() => ({name:options.module,modulename: "'"+options.module+"'"})))
			.pipe(template())			
			.pipe(rename(options.module+'.controller.js'))
			.pipe(debug())
			.pipe(gulp.dest('app/modules/'+options.module))
			
		  gulp.src('sample/sample.css')
			.pipe(data(() => ({name: options.module})))
			.pipe(template())			
			.pipe(rename(options.module+'.css'))
			.pipe(debug())
			.pipe(gulp.dest('app/modules/'+options.module))
	}		
		
});