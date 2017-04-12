import browserify from 'browserify';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { isDev, logError } from './utils';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import cssImport from 'postcss-import';
import urlrewrite from 'postcss-urlrewrite';

export function bundle() {
    return browserify({
        entries: './src/app',
        extensions: ['.js', '.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        paths: ['./node_modules']
    })
        .plugin('modular-css/browserify', {
            css: './temp/css/app.css',
            sourcemaps: true,
            before: [
            ],
            after: [
                // inline @import styles
                cssImport(),

                // rewrite font (node_modules/typeface-open-sans) src urls (see gulp task build:fonts)
                urlrewrite({ rules: [{ from: /files\/(open-sans.*)/, to: '../fonts/$1' }] }),

                // prefix css
                autoprefixer()
            ],
            done: [
                cssnano()
            ]
        })
        .transform('babelify');
}

export function buildSource(bundle) {
    return bundle.on('error', logError)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(!isDev() ? uglify() : gutil.noop()).on('error', logError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./temp/js/'));
}

gulp.task('build:source', () => {
    return buildSource(bundle().bundle());
});

gulp.task('build:fonts', () => {
    return gulp.src('./node_modules/typeface-open-sans/files/*')
        .pipe(gulp.dest('./temp/fonts/'));
});
