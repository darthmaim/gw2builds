import gutil from 'gulp-util';

export function logError(error) {
    gutil.log(error);
    this.emit('end');

    if(!isDev()) {
        throw new Error(error);
    }
}

export function isDev() {
    return process.env.NODE_ENV === 'development';
}
