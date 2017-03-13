import gulp from 'gulp';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import { buildSource, bundle } from './app';
import watchify from 'watchify';
import nodemon from 'gulp-nodemon';

const sync = browserSync.create();

gulp.task('browsersync-reload:all', callback => {
    runSequence('build', 'browsersync-reload', callback);
});

gulp.task('browsersync-reload:source', callback => {
    runSequence('build:source', 'revision', 'browsersync-reload', callback);
});

gulp.task('browsersync-reload:img', callback => {
    runSequence(['build:img', 'build:favicon'], 'revision', 'browsersync-reload', callback);
});

gulp.task('browsersync-reload', callback => {
    sync.reload();
    callback();
});

gulp.task('dev', callback => {
    process.env.NODE_ENV = 'development';

    runSequence('nodemon', () => {
        sync.init({
            proxy: 'http://localhost:3000',
            port: '5000'
        });

        const b = bundle().plugin(watchify);
        b.on('update', _ => buildSource(b.bundle()).on('finish', () => runSequence('revision', 'browsersync-reload')));
        buildSource(b.bundle());

        gulp.watch('./assets/img/**', ['browsersync-reload:img']);
        gulp.watch('./views/**', ['browsersync-reload']);
        gulp.watch('./assets/js/sw.js', ['build:service-worker']);
        callback();
    });
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
        setTimeout(() => sync.reload({ stream: false }), 500);
    });
});
