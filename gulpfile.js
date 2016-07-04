var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var paths = {
	images: {
		input: 'public/images/**/*',
		output: 'public/images'
	},
	sass: {
		main: 'public/scss/main.scss',
		input: 'public/scss/**/*.scss',
		output: 'public/css'
	},
	js: {
		main: 'public/js/main.js',
		input: 'public/js/components/**/*.js',
		output: 'public/js',
		vendor: 'public/js/vendor/**/*.js',
		vendorOut: 'public/js/vendor'
	},
	dist: './'
};

/**
 * Watch task
 */
gulp.task('default', function () {
	livereload.listen();
	gulp.watch(paths.sass.input, ['sass']);
});

/**
 * Compile and copy SCSS to dist
 */
gulp.task('sass', function () {
	return gulp.src(paths.sass.input)
		.pipe(sass({ outputStyle: 'compressed' })
			.on('error', sass.logError))
		.pipe(concat('main.css'))
		.pipe(gulp.dest(paths.sass.output))
		.pipe(livereload());
});
