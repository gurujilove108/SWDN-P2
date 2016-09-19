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

	/* rimraf is used for deleting files, folder, and all content of a folder recursively */
	rimraf 		= require('rimraf'),

	/* used for compressing html */
	htmlmin		= require('gulp-htmlmin'),

	/* used for properyly minifying angular */
	ngAnnotate 	= require('gulp-ng-annotate'),

	/* used for renaming files */
	rename 		= require('gulp-rename'),

	/* used for merging multiple gulp streams into 1 */
	mergeStream = require('merge-stream'),

	/* used to delete files and folders */
	del 		= require('del'),

	/* used for ignoring certain file patterns when performing gulp tasks */
	gulpIgnore 	= require('gulp-ignore'),

	/* used for checking conditions when performing gulp tasks, gulp-if just adds the ability to add if statements to our tasks */
	gulpIf 		= require('gulp-if');

/* process is a global node object and we can access any command line arguments by process.argv, no plugins are required for this */
var cliArgs = process.argv;

/* One example of copying files. In this case, notice we have a folder test in our root directory */
gulp.task("copy-files-v1", function(done) {

	/* 1. Add all files recursively in the static folder to the test folder. If test folder does not exist, it will be created */
	/* 2. Add every python file recursively from the root directory into the test folder */
	/* 3. Add every txt file to the test folder except in this case we are going to ignore the node_modules folder, if the folder copiedTextFiles does not exist inside of test, it will be created */
	gulp.src('static/**/*').pipe(gulp.dest('test'));
	gulp.src('./**/*.py').pipe(gulp.dest('test'));
	gulp.src('./**/*.txt').pipe(gulpIgnore.exclude("node_modules/**")).pipe(gulp.dest('test/copiedTextFiles'));

	done();
});

/* Do the same thing as above except we are going to use the merge-stream plugin */
gulp.task("copy-files-v2", function(done) {
	return mergeStream(
		gulp.src('static/**/*').pipe(gulp.dest('test')),
		gulp.src('./**/*.py').pipe(gulp.dest('test')),
		gulp.src('./**/*.txt').pipe(gulpIgnore.exclude("node_modules/**")).pipe(gulp.dest('test/copiedTextFiles'))
	);
});

/* 1. Use the del plugin to delete a file */
/* 2. Use the rimraf plugin to delete a file */
gulp.task("remove-file-v1", function(done) {
	del(['temp.txt'], done);
});

gulp.task("remove-file-v2", function(done) {
	rimraf("temp.txt", done);
});

/* 1. Use the del plugin to delete a folder */
/* 2. Use the rimraf plugin to delete a folder */
gulp.task("remove-folder-v1", function(done) {

	/* We don't have to have a return statement, it can be omitted, but the key to the return statement is to make sure asynchronous tasks are done */
	return del(['test'], done);
});

gulp.task("remove-folder-v2", function(done) {
	rimraf('test', done);
});

/* Use rimraf to delete all contents of a folder, but not the folder itself, and passing in a custom callback */
gulp.task('remove-folder-contents-v1', function(done) {
	rimraf('test/*', function() {
		done();
	});
});

/* Same as above except were going to be tricky about how we pass in a callback */
gulp.task('remove-folder-contents-v2', function(done) {
	rimraf('test/*', (function() {
		return function() {
			done();
		}
	})());
});



























// var ignore = require('gulp-ignore');
// var rimraf = require('gulp-rimraf');

// gulp.task('task', function() {
// return gulp.src('./**/*.js', { read: false }) // much faster
//   .pipe(ignore('node_modules/**'))
//   .pipe(rimraf());
// });


