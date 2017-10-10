var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var tsProject = ts.createProject("tsconfig.json");
var del = require('del');

function move(src, dest) {
    return gulp.src(src)
        .pipe(gulp.dest(dest));
};

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copy_public', ['clean'], function () {
    return move('src/public/**/*', 'dist/public');
});

gulp.task('copy_views', ['clean'], function () {
    return move('src/views/**/*', 'dist/views');
});

gulp.task("build", ['copy_public', 'copy_views'], function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./dist"));
});

gulp.task('default', ['build']);