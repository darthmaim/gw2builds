import gutil from 'gulp-util';

export function logError(error) {
    gutil.log(error);
    this.emit('end');
}

export function isDev() {
    return process.env.NODE_ENV === 'development';
}
