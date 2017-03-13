import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import del from 'del';

gulp.task('clean', () => {
    return del(['./public', './temp']);
});

gulp.task('build', callback => {
    runSequence('clean', ['build:source', 'build:img', 'build:favicon', 'build:service-worker'], 'revision', callback);
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
