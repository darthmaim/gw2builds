import gulp from 'gulp';

gulp.task('build:static', () => {
    return gulp.src('./assets/robots.txt')
        .pipe(gulp.dest('./public/'));
});
