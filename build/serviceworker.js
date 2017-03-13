import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import { isDev, logError } from './utils';

gulp.task('build:service-worker', () => {
    return gulp.src('./assets/js/sw.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(!isDev() ? uglify({ mangle: { toplevel: true } }) : gutil.noop()).on('error', logError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
});
