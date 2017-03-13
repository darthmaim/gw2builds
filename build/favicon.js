import gulp from 'gulp';
import ico from 'gulp-to-ico';

gulp.task('build:favicon', () => {
    return gulp.src('./assets/img/favicon/*.png')
        .pipe(ico('favicon.ico'))
        .pipe(gulp.dest('./public'));
});
