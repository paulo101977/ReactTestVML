var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    ngannotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    //return del(['dist']);
});

//compile sass
gulp.task('sass', function () {
  //return gulp.src('./dist/sass/**/*.scss')
  // .pipe(sass().on('error', sass.logError))
  //  .pipe(gulp.dest('./dist/styles'));
});

gulp.task('copy_bower' , function(){
    gulp.src(['src/bower_components/**/*'])
        .pipe(gulp.dest('dist/bower_components'));
});
    



// Default task
gulp.task('default', function() {
    gulp.start('copy_bower', 'copy_styles' , 'usemin', 'sass' , 'imagemin','copyfonts','copytemplates');
});

gulp.task('copytemplates' , function(){
    gulp.src('app/templates/**/*.html')
   .pipe(gulp.dest('./dist/templates'));
})


gulp.task('copy_styles' , function(){
    gulp.src(['src/styles/**/*'])
   .pipe(gulp.dest('./dist/styles'));
})


gulp.task('usemin',['jshint'], function () {
  /*return gulp.src('./src/index.html')
    .pipe(usemin({
      css:[minifycss(),rev()],
      js: [ngannotate(),uglify(),rev()]
    })) 
    .pipe(gulp.dest('dist/'));*/
});

// Images
gulp.task('imagemin', function() {

});

gulp.task('copyfonts', ['clean'], function() {
   gulp.src('./src/bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./src/bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  //gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
      // Watch image files
  //gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'] ,function () {
   var files = [
      'dist/**/*.html',
      'dist/styles/**/*.css',
      'dist/images/**/*.png',
      'dist/scripts/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "index.html"
      }
   });
        // Watch any files in dist/, reload on change
 gulp.watch(['dist/index.html']).on('change', browserSync.reload);
});