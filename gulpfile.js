const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const watch = require('gulp');

gulp.task('default', function () {
	gulp.series('watch');
});

gulp.task('style_release', function () {
	return gulp.src('src/scss/export.scss').pipe(sass()).pipe(concat('z.css')).pipe(gulp.dest('dist/css')).pipe(minifyCSS()).pipe(concat('z.min.css')).pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.scss', gulp.series('style_release'));
});

gulp.task('style_doc', function () {
	return gulp.src('src/scss-doc/style.scss').pipe(sass()).pipe(concat('style.css')).pipe(gulp.dest('assets/css')).pipe(minifyCSS()).pipe(concat('style.min.css')).pipe(gulp.dest('assets/css'));
});

gulp.task('watch-doc', function () {
	gulp.watch('src/scss-doc/**/*.scss', gulp.series('style_doc'));
});
