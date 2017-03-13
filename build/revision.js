import rev from 'gulp-rev-all';
import gulp from 'gulp';

gulp.task('revision', () => {
    return gulp.src('./temp/**')
        .pipe(rev.revision({
            includeFilesInManifest: ['.css', '.js', '.png', '.jpg', '.gif', '.svg']
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(rev.manifestFile())
        .pipe(gulp.dest('./public/'));
});
