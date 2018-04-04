import browserify from 'browserify';
import autoprefixer from 'autoprefixer';
import commonShake from 'common-shakeify';
import cssnano from 'cssnano';
import envify from 'envify/custom';
import { isDev, logError } from './utils';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import packFlat from 'browser-pack-flat/plugin';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import cssImport from 'postcss-import';
import urlrewrite from 'postcss-urlrewrite';
import through from 'through2';
import shortNamer from 'modular-css-short-namer';

export function bundle(cb) {
    const b = browserify({
        entries: './src/app',
        extensions: ['.js', '.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        paths: ['./node_modules']
    })
        .plugin('modular-css/browserify', {
            css: './temp/css/app.css',
            map : true,
            namer: !isDev() ? shortNamer() : undefined,
            before: [],
            after: [
                // inline @import styles
                cssImport(),

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

    if(isDev()) {
        return b;
    }

    return b
        .transform(envify(process.env), { global: true })
        .transform('uglifyify', {
            global: true,
            toplevel: true,
            mangle: false,
            output: {
                ascii_only: true
            }
        })
        .plugin(commonShake)
        .plugin(packFlat, {});
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
    return gulp.src('./node_modules/typeface-open-sans/files/*.{woff,woff2}')
        .pipe(gulp.dest('./temp/fonts/'));
});
