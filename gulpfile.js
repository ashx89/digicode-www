var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

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
 * Compile and copy SCSS to dist
 */
gulp.task('sass', function () {
	return gulp.src(paths.sass.input)
		.pipe(sass({ outputStyle: 'compressed' })
			.on('error', sass.logError))
		.pipe(concat('main.css'))
		.pipe(gulp.dest(paths.sass.output))
});

/**
 * Watch task
 */
gulp.task('watch', function () {
	gulp.watch(paths.sass.input, ['sass']);
});
