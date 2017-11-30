var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('page/assets/sass/**/*.scss') 
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('page/assets/css'))
});

gulp.task('cleanCss', function() {
  return gulp.src("page/assets/**/*.css")
  .pipe(cleanCss())
  .pipe(gulp.dest('dist/assets/'))
});

gulp.task('images', function(){
  return gulp.src('page/assets/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('move',function(){
  return gulp.src('page/*.+(html|png|)')
  .pipe(gulp.dest('dist'))
});

gulp.task('js', function(){
  return gulp.src('page/assets/js/*.js')
  .pipe(babel({presets: ['minify']}))
  .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('serve', function () {

    browserSync.init({
        server: "./page"
    });

    gulp.watch("page/*.html").on("change", browserSync.reload);
    gulp.watch("page/assets/css/*.css").on("change", browserSync.reload);
    gulp.watch("page/assets/js/*.js").on("change", browserSync.reload);
});

gulp.task('watch',['sass'], function(){
  gulp.watch('page/assets/sass/**/*.scss',['sass']);
});

gulp.task('default',['watch','sass','serve']);

gulp.task('dist',['default','cleanCss','images','move','js']);
