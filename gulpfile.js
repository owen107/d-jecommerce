var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');

var jsSources = [
   'components/scripts/app.js',
   "components/scripts/jquery.easing.js",
   "components/scripts/move-top.js",
   "components/scripts/jquery.flexisel.js"
];

var sassSources = ['components/sass/application.scss'];
var htmlSources = ['builds/development/*.html'];

gulp.task('js', function() {
	gulp.src(jsSources)
	   .pipe(concat('script.js'))
	   .pipe(browserify())
	   .pipe(gulp.dest('builds/development/js'))
	   .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      css: 'builds/development/css',
      sass: 'components/sass',
      image: 'builds/development/images',
      font: 'builds/development/fonts',
      relative: false,
      style: 'expanded',
      comments: true,
      require: ['susy', 'breakpoint']
    })
     .on('error', gutil.log))
   .pipe(gulp.dest('builds/development/css'))
   .pipe(connect.reload())
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch([
    'components/sass/*.scss', 
    'components/sass/*/*.scss', 
    'components/sass/modules/header/*.scss',
    'components/sass/modules/home/*.scss',
    'components/sass/modules/auth/*.scss',
    'components/sass/modules/footer/*.scss',
    'components/sass/modules/cart/*.scss',
    'components/sass/modules/category/*.scss',
    'components/sass/modules/product/*.scss'
  ], ['compass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/development/',
    livereload: true
  });
});

gulp.task('default', ['html', 'js', 'compass', 'watch', 'connect']);