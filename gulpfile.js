/* Specifying gulp dependencies 
 * Notes to Udacity, If this gulp file contains less code than any other project, and when I mean code, I mean code, not comments
 * Then I failed. The point here is to experiment with gulp as much as possible, figure out what all these programs do. 
 * Solve a random problem with each plugin if I can't find a real one just to learn it. Question. How many of the 17 Unix rules of programming does gulp apply to?
 * You might notice I'm solving the same problem with 2 different plugins, this is mandatory, otherwise I would just be left in the clouds wondering why someone would solve
 * The same problem in a different way. Yay Gulp...
 * One of the 17 rules of Unix is that the output of one program should be the input for another, which is why gulp is so cool.
 * Another rule is that you should write software as if one of the most important things is for your program to be readable by other programmers.
 * Some of these plugins I noticed in Udacity's wittr gulpfile.js and wanted to at least check a couple of them out
 * Also, I'm attempting to make a gulp master file so gulp beginners can learn it fast. Many tutorials just show one or two things
 * Well, I'm going to put all those tutorials into one
 * For the last project I was able to quickly learn gulp and solve the problems I need to solve, but my overall understanding of gulp was not great
 * This file is for experimenting and exploring gulp
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

	/* gulp-rimraf pretty much does the same thing as rimraf except this is gulp-rimraf and you can use just a little different */
	gulpRimraf 	= require('gulp-rimraf'),

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
	gulpIf 		= require('gulp-if'),

	/* same thing as gulp-if except we add the else part. We could just use gulpIfElse, and remove gulpIf, and if we just wanted to use just the gulpIf part, we would provide null or an empty function for the else part */
	gulpIfElse 	= require('gulp-if-else'),

	/* You can log output to the terminal by using console.log, or you can be more sophisticated and use gulp-util which has several advantages */
	gulpUtils 	= require('gulp-util');


/* process is a global node object and we can access any command line arguments by process.argv, no plugins are required for this */
var cliArgs = process.argv;

/* Store filepaths for easy access */
var paths = {
	allFiles : "./**/*"
};

/* One example of copying files. In this case, notice we have a folder test in our root directory, also when running this task from the terminal, it will only say starting task in the logs, but no finished log, lets add another version of this task except we call done() at the end to ensure the finished task part shows up in the logs */
gulp.task("copy-files-v1", function(done) {

	/* 1. copy all files recursively in the static folder to the test folder using gulp.src, pipe for passing in output as input to another program, and If test folder does not exist, it will be created */
	/* 2. copy every python file recursively from the root directory into the test folder */
	/* 3. copy every txt file to the test folder except in this case we are going to ignore the node_modules folder, if the folder copiedTextFiles does not exist inside of test, it will be created */
	gulp.src('static/**/*').pipe(gulp.dest('test'));
	gulp.src('./**/*.py').pipe(gulp.dest('test'));
	gulp.src('./**/*.txt').pipe(gulpIgnore.exclude("node_modules/**")).pipe(gulp.dest('test/copiedTextFiles'));
});

/* Same exact method as above except we call done() at the end. This callback and using return assure async tasks get done */
gulp.task("copy-files-v2", function(done) {
	gulp.src('static/**/*').pipe(gulp.dest('test'));
	gulp.src('./**/*.py').pipe(gulp.dest('test'));
	gulp.src('./**/*.txt').pipe(gulpIgnore.exclude("node_modules/**")).pipe(gulp.dest('test/copiedTextFiles'));
	done();
});

/* Do the same thing as above 2 tasks except we are going to use the merge-stream plugin */
gulp.task("copy-files-v3", function(done) {
	return mergeStream(
		gulp.src('static/**/*').pipe(gulp.dest('test')),
		gulp.src('./**/*.py').pipe(gulp.dest('test')),
		gulp.src('./**/*.txt').pipe(gulpIgnore.exclude("node_modules/**")).pipe(gulp.dest('test/copiedTextFiles'))
	);
});

/* Use the del plugin to delete a file, Notice there is just a starting phase in the logs and no finished phase, lets create the same exact task below except so we can see a finished phase in the logs */
gulp.task("remove-file-v1", function(done) {
	del(['temp.txt'], done);
});

/* Same as above execpt we have a return statement, this ensures the finished phase run, also to test the whole starting nd finished phase, there doesn't actually need to be a file temp.txt to test running certain tasks */
gulp.task("remove-file-v2", function(done) {
	return del(['temp.txt'], done);
});

/* Interesting enough, this task has a starting and finished phase, keep in mind you can substitute different filepaths for the first param of rimraf */
gulp.task("remove-file-v3", function(done) {
	rimraf("temp.txt", done);
});

/* 1. Use the del plugin to delete a folder. Since we have an understanding of starting and finishing in the logs */
gulp.task("remove-folder-v1", function(done) {
	return del(['test'], done);
});

/* Use the rimraf function (not gulpRimraf) to delete a folder */
gulp.task("remove-folder-v2", function(done) {
	rimraf('test', done);
});

/* Use rimraf to delete all contents of a folder, but not the folder itself, and passing in a custom callback */
gulp.task('remove-folder-contents-v1', function(done) {
	rimraf('test/*', function() {
		done();
	});
});

/* Same as above except were going to be tricky about how we pass in a callback, we pass in a function that gets called immediately, and then returns the same function used as the function above */
gulp.task('remove-folder-contents-v2', function(done) {
	rimraf('test/*', (function(anything) {
		return  function() {
			done();
		};
	})(anything));
});

/* Truth is we could just call as many function and function calls, this essentially makes layers for gulp tasks*/
gulp.task('remove-folder-contents-v3', function(done) {
	rimraf('test/*', (function(anything1) {
		return  function(anything2) {
			return function() {
				done();
			}
		};
	})(anything1)(anything2));
});

/* This task produces an error, an AssertionError that says rimraf is missing path, lets try this same except task except with gulpRimraf opposed to just rimraf*/
gulp.task('remove-folder-contents-v4-err', function(done) {
	return gulp.src("test/*").pipe(rimraf());
});

/* Use gulpRimraf instead of just plain old rimraf to fix the error above. Notice there's no return statement beofre the gulp.src statement, this task removes most of the contents from folder test, but not all of them, run the task and see for yourself, in some cases this might work but in this case it leaves a few files instead of removing everything from the test folder, lets see what happens when we add a return statement */
gulp.task('remove-folder-contents-v5', function(done) {
	gulp.src("test/*").pipe(gulpRimraf());
	done() /* Calling this callback ensures the finished log will show up opposed to not showing up. Run the task. Then comment out the done() cb and notice the magic of the finished log disappearing */
});

/* Literally the same exact function above except we use a return statement, this fixes the problems from the above function and gets rid of all files inside the test folder, opposed to having the risk to leave a few files behind */
gulp.task('remove-folder-contents-v6', function(done) {
	return gulp.src("test/*").pipe(gulpRimraf());
});

var jsUglifyFunction = gulp.task('uglify-js', function(done) {
	return gulp.src("static/**/*.js").pipe(uglify()).pipe(gulp.dest('test'));
});

var noJsUglifyFunction = gulp.task('no-uglify-js', function(done) {
	return gulpUtils.log("not uglifying js");
});

/* Use gulp-if, gulp-ignore, gulp-rename and uglify, also the uglifying of js will only take place if a user passes in --true when running this task, otherwise we log "js files not uglified" */
gulp.task('minify-js-v1', function(done) {
	var uglifyCondition = (cliArgs.indexOf("--true") > -1);
	gulp.src("static/js/*.js")
		.pipe(gulpIgnore.exclude("node_modules/**"))
		.pipe(gulpIfElse(uglifyCondition, function() {}, function() {}));
});

gulp.task('show-node-info', function(done) {
	console.log(process);
	console.log(process.env);
	console.log(process.env.NODE_ENV);
});

gulp.task('reload:onchange', function(done) {
	
	browserSync.init({
    	proxy: "localhost:8080"
    });

	gulp.watch(paths.allFiles).on('change', reload);
});































// var ignore = require('gulp-ignore');
// var rimraf = require('gulp-rimraf');

// gulp.task('task', function() {
// return gulp.src('./**/*.js', { read: false }) // much faster
//   .pipe(ignore('node_modules/**'))
//   .pipe(rimraf());
// });


