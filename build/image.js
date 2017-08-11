import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import { logError } from './utils';

gulp.task('build:img', () => {
    return gulp.src('./assets/img/**')
        .pipe(imagemin()).on('error', logError)
        .pipe(gulp.dest('./temp/img/'));
});
