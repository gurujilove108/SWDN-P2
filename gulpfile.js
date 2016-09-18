/* Specifying gulp dependencies */
var gulp 		= require('gulp'),

	/* used for reloading changes into the browser on file save to increase decelopment speed */ 
	browserSync = require('browser-sync').create(),

	/* just simplifying the reload browser method*/
	reload 		= browserSync.reload;

	/* used for compressing css files */ 
	cssmin 		= require('gulp-cssmin'),

	/* used for taking the content from one or several files and putting that content into one file */
	concat 		= require('gulp-concat'),

	/* used for compressing javascript, we can use the words minifying and compresssing interchangeably */ 
	uglify		= require('gulp-uglify'),

	/* rimraf is used for deleting files, pretty cool huh! */
	rimraf 		= require('rimraf'),

	/* used for compressing html */
	htmlmin		= require('gulp-htmlmin'),

	/* used for properyly minifying angular */
	ngAnnotate 	= require('gulp-ng-annotate'),

	/* used for renaming files */
	rename 		= require('gulp-rename');



gulp.task("default", function(done) {
	done();
});