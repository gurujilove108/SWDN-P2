/* Specifying gulp dependencies 
 * Notes to Udacity, If this gulp file contains less code than any other project
 * Then I failed. The point here is to experiment with gulp as much as possible, figure out what all these programs do. 
 * Solve a random problem with each plugin if I can't find a real one just to learn it. Question. How many of the 17 Unix rules of programming does gulp apply to?
 * You might notice I'm solving the same problem with 2 different plugins, this is mandatory, otherwise I would just be left in the clouds wondering why someone would solve
 * The same problem in a different way. Yay Gulp...
 * One of the 17 rules of Unix is that the output of one program should be the input for another, which is why gulp is so cool.
 * Another rule is that you should write software as if one of the most important things is for your program to be readable by other programmers.
 */
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
	rename 		= require('gulp-rename'),

	mergeStream = require('merge-stream'),

	del 		= require('del');

var cliArgs = process.argv;

gulp.task("default", function(done) {
	console.log("Run as many gulp tasks as possible");
	done();
});

gulp.task("show-cli-args", function(done) {
	
});

/* One example of copying files into the test folder*/
gulp.task("copy-files-v1", function(done) {

	/* Add all files recursively in the static folder to the test folder. If test folder does not exist, it will be created */
	gulp.src('static/**/*').pipe(gulp.dest('test'));

	/* Add every python file recursively from the root directory into the test folder */
	gulp.src('**/*.py').pipe(gulp.dest('test'));
});

/* Use the del plugin to delete a folder, file in this case means a folder or a file*/
gulp.task("remove-file-v1", function(done) {
	del(['test'], done);
});

/* Use the rimraf plugin to delete all content of a folder recursively and passing in a custom callback */
gulp.task('remove-folder-content', function(done) {
	rimraf('/test', function() {
		done();
	})
});

/* Use the rimraf plugin to delete a folder*/
gulp.task("remove-file-v2", function(done) {
	rimraf('test', done);
});

/* Use rimraf to delete all contents of a folder */

// var ignore = require('gulp-ignore');
// var rimraf = require('gulp-rimraf');

// gulp.task('task', function() {
// return gulp.src('./**/*.js', { read: false }) // much faster
//   .pipe(ignore('node_modules/**'))
//   .pipe(rimraf());
// });


