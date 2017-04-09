import browserify from 'browserify';
import { isDev, logError } from './utils';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';

export function bundle() {
    return browserify({
        entries: './assets/js/serviceworker',
        extensions: ['.js'],
        debug: true,
        cache: {},
        packageCache: {},
        paths: ['./node_modules']
    }).transform('babelify');
}

export function buildSource(bundle) {
    return bundle.on('error', logError)
        .pipe(source('sw.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(!isDev() ? uglify() : gutil.noop()).on('error', logError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
}

gulp.task('build:service-worker', () => {
    return buildSource(bundle().bundle());
});

gulp.task('watch:service-worker', () => {
    // create a bundle config with watchify
    const watchifyBundle = bundle().plugin('watchify');

    // handle file changes
    watchifyBundle.on('update', () => {
        // rebuild bundle, then revision the files and reload connected browsers
        buildSource(watchifyBundle.bundle());
        gutil.log('Updated Service Worker');
    });

    // initial build
    buildSource(watchifyBundle.bundle());
});
