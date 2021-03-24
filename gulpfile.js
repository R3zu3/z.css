const gulp      = require('gulp');
const sass      = require('gulp-sass');
const concat    = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const watch     = require('gulp');

gulp.task('hello', function() {
  console.log('Hello ');
});

gulp.task('style', function(){
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(concat('z.css'))
  .pipe(gulp.dest('dist/css'))
});

gulp.task('style_min', function(){
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(minifyCSS())
  .pipe(concat('z.min.css'))
  .pipe(gulp.dest('dist/css'))
});

gulp.task('style_release', function(){
  return gulp.src('src/scss/export.scss')
  .pipe(sass())
  .pipe(concat('z.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(minifyCSS())
  .pipe(concat('z.min.css'))
  .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function (){
  gulp.watch('src/scss/**/*.scss', gulp.series('style_release'));
});
