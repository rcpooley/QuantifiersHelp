const gulp = require('gulp');
const ts = require('gulp-typescript');
const jasmine = require('gulp-jasmine');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');

gulp.task('build', function() {
    const tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
});

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('test:run', function() {
    return gulp.src('dist/**/spec/**/*')
        .pipe(jasmine())
});

gulp.task('test', [], function(cb) {
    runSequence('clean', 'build', 'test:run', cb);
});
