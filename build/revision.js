import sourcemaps from 'gulp-sourcemaps';
import rev from 'gulp-rev-all';
import gulp from 'gulp';

gulp.task('revision:cssmap', () => {
    return gulp.src('./temp/**/*.css')
        .pipe(sourcemaps.init({ loadMaps: true, debug: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./temp/'));
});

gulp.task('revision', ['revision:cssmap'], () => {
    return gulp.src('./temp/**')
        .pipe(rev.revision({
            includeFilesInManifest: ['.css', '.js', '.png', '.jpg', '.gif', '.svg', '.woff', '.woff2', '.eot']
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(rev.manifestFile())
        .pipe(gulp.dest('./public/'));
});
