
var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('server', function () {
    connect.server({
        root: './'
    });
});

gulp.task('build', function () {
    return gulp.src('./src/SRouter.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('./src'));
})