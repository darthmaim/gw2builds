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
import through from 'through2';
import shortNamer from 'modular-css-short-namer';

export function bundle(cb) {
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
            namer: !isDev() ? shortNamer() : undefined,
            before: [
            ],
            after: [
                // inline @import styles
                cssImport(),

                // rewrite font (node_modules/typeface-open-sans) src urls (see gulp task build:fonts)
                urlrewrite({ rules: [{ from: /\.\/files\/(open-sans.*)/, to: '../fonts/$1' }] }),

                // prefix css
                autoprefixer(),
            ],
            done: [
                // minify the generated css
                cssnano({ preset: 'default' }),

                // notify the bundle we are done with the css processing
                () => cb()
            ]
        })
        .transform('babelify');
}

export function buildSource(bundle, wait) {
    return bundle.on('error', logError)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(delayStream(wait))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(!isDev() ? uglify() : gutil.noop()).on('error', logError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./temp/js/'))
}

function delayStream(wait) {
    return through.obj(
        (file, enc, cb) => cb(null, file),
        (cb) => wait(() => cb())
    );
}

export function createController() {
    const callbacks = [];
    let isDone = false;

    return {
        done() {
            if(!isDone) {
                callbacks.forEach(cb => cb())
            }

            isDone = true;
        },

        wait(cb) {
            if(isDone) {
                cb();
            }

            callbacks.push(cb);
        },

        reset() {
            isDone = false;
            callbacks.length = 0;
        }
    }
}

gulp.task('build:source', () => {
    const controller = createController();

    return buildSource(bundle(controller.done).bundle(), controller.wait);
});

gulp.task('build:fonts', () => {
    return gulp.src('./node_modules/typeface-open-sans/files/*')
        .pipe(gulp.dest('./temp/fonts/'));
});
