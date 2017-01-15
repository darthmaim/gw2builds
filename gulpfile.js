'use strict';

const
    browserify = require('browserify'),
    watchify = require('watchify'),
    del = require('del'),
    gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    imagemin = require('gulp-imagemin'),
    nodemon = require('gulp-nodemon'),
    rev = require('gulp-rev-all'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    ico = require('gulp-to-ico'),
    babel = require('gulp-babel'),

    browserSync = require('browser-sync').create();

function logError(error) {
    gutil.log(error);
    this.emit('end');
}

function isDev() {
    return process.env.NODE_ENV == 'development';
}

function bundle() {
    return browserify({
        entries: './assets/js/app',
        extensions: ['.js', '.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        paths: ['./node_modules']
    })
        .plugin('modular-css/browserify', {
            css: './build/css/app.css',
            sourcemaps: true,
            after: [
                autoprefixer({ browsers: ['> 1%'] })
            ],
            done: [
                cssnano()
            ]
        })
        .transform('babelify')
}

function buildAssets(bundle) {
    return bundle.on('error', logError)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(!isDev() ? uglify() : gutil.noop()).on('error', logError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js/'));
}

gulp.task('clean', () => {
    return del(['./public', './build']);
});

gulp.task('build:assets', () => {
    return buildAssets(bundle().bundle());
});

gulp.task('build:img', () => {
    return gulp.src('./assets/img/**')
        .pipe(imagemin()).on('error', logError)
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('build:favicon', () => {
    return gulp.src('./assets/img/favicon/*.png')
        .pipe(ico('favicon.ico'))
        .pipe(gulp.dest('./public'));
});

gulp.task('build:service-worker', () => {
    return gulp.src('./assets/js/sw.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(!isDev() ? uglify({mangle: {toplevel: true}}) : gutil.noop()).on('error', logError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
});

gulp.task('revision', () => {
    return gulp.src('./build/**')
        .pipe(rev.revision({
            includeFilesInManifest: ['.css', '.js', '.png', '.jpg', '.gif', '.svg']
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(rev.manifestFile())
        .pipe(gulp.dest('./public/'));
});

gulp.task('nodemon', ['build'], callback => {
    let called = false;
    return nodemon({
        script: './bin/www',
        watch: ['app.js', 'bin/www']
    }).on('start', () => {
        if (!called) {
            called = true;
            callback();
        }
    }).on('restart', () => {
        setTimeout(() => browserSync.reload({ stream: false }), 500);
    });
});

gulp.task('browsersync-reload:all', callback => {
    runSequence('build', 'browsersync-reload', callback);
});

gulp.task('browsersync-reload:assets', callback => {
    runSequence('build:assets', 'revision', 'browsersync-reload', callback);
});

gulp.task('browsersync-reload:img', callback => {
    runSequence(['build:img', 'build:favicon'], 'revision', 'browsersync-reload', callback);
});

gulp.task('browsersync-reload', callback => {
    browserSync.reload();
    callback();
});

gulp.task('dev', callback => {
    process.env.NODE_ENV = 'development';

    runSequence('nodemon', () => {
        browserSync.init({
            proxy: 'http://localhost:3000',
            port: '5000'
        });

        const b = bundle().plugin(watchify);
        b.on('update', _ => buildAssets(b.bundle()).on('finish', () => runSequence('revision', 'browsersync-reload')));
        buildAssets(b.bundle());

        gulp.watch('./assets/img/**', ['browsersync-reload:img']);
        gulp.watch('./views/**', ['browsersync-reload']);
        gulp.watch('./assets/js/sw.js', ['build:service-worker']);
        callback();
    });
});

gulp.task('build', callback => {
    runSequence('clean', ['build:assets', 'build:img', 'build:favicon', 'build:service-worker'], 'revision', callback);
});

gulp.task('help', () => {
    gutil.log();
    gutil.log(gutil.colors.underline('Usage'));
    gutil.log('  gulp [TASK] [OPTIONS...]');
    gutil.log();
    gutil.log(gutil.colors.underline('Available tasks'));
    gutil.log('  ' + gutil.colors.cyan('build') + '     Build all files.');
    gutil.log('  ' + gutil.colors.cyan('dev') + '       Start development server and build files on changes.');
    gutil.log();
    gutil.log('  ' + gutil.colors.cyan('clean') + '     Clean all build files.');
    gutil.log('  ' + gutil.colors.cyan('help') + '      Show this help.');
    gutil.log('  ' + gutil.colors.cyan('nodemon') + '   Build all files then start the internal server.');
    gutil.log('  ' + gutil.colors.cyan('revision') + '  Revision all assets.');
    gutil.log();
});

gulp.task('default', ['help']);
