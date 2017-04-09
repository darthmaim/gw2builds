import gulp from 'gulp';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import nodemon from 'gulp-nodemon';
import watchify from 'watchify';
import { buildSource, bundle } from './app';

// create a browsersync instance
const sync = browserSync.create();

// helper task to rebuild images and then reload connected browsers
gulp.task('browsersync-reload:img', callback => {
    runSequence(['build:img', 'build:favicon'], 'revision', 'browsersync-reload', callback);
});

// helper task to reload all connected browsers
gulp.task('browsersync-reload', callback => {
    sync.reload();
    callback();
});

// main dev tasks build all files and watching them for changes
gulp.task('dev', callback => {
    // set environment to development (this disables some long running optimization and adds helpful output)
    process.env.NODE_ENV = 'development';

    // start the internal dev server
    runSequence('nodemon', () => {
        // initialize browsersync
        sync.init({
            proxy: 'http://localhost:3000',
            port: '5000'
        });

        // create a bundle config with watchify
        const watchifyBundle = bundle().plugin(watchify);

        // handle file changes
        watchifyBundle.on('update', () => {
            // rebuild bundle, then revision the files and reload connected browsers
            buildSource(watchifyBundle.bundle())
                .on('finish', () => runSequence('revision', 'browsersync-reload'));
        });

        // initial build
        buildSource(watchifyBundle.bundle());

        // watch some easier assets
        gulp.watch('./assets/img/**', ['browsersync-reload:img']);
        gulp.watch('./server/views/**', ['browsersync-reload']);

        callback();
    });
});

// helper task to start a server (and restart it when app.js or bin/www changed)
gulp.task('nodemon', ['build'], callback => {
    let called = false;
    return nodemon({
        script: './server/bin/www',
        watch: ['server/app.js', 'server/bin/www']
    }).on('start', () => {
        if (!called) {
            called = true;
            callback();
        }
    }).on('restart', () => {
        setTimeout(() => sync.reload({ stream: false }), 500);
    });
});
