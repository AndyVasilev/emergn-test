//install
//npm i browser-sync gulp gulp-less gulp-autoprefixer gulp-sourcemaps gulp-plumber
var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

//compile less, create sourcemaps and refresh browsers
gulp.task('less', function() {
    //less, sourcemaps and refresh
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//browserSync settings
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

//watch settings
gulp.task('watch', ['browser-sync', 'less'], function() {
    gulp.watch('app/less/*.less', ['less']);
    gulp.watch('app/*.html', browserSync.reload);
});

//set default task
gulp.task('default', ['watch']);
