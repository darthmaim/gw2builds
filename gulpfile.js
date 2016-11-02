"use strict";

const
    browserify = require("browserify"),
    del = require("del"),
    gulp = require("gulp"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    imagemin = require("gulp-imagemin"),
    nodemon = require("gulp-nodemon"),
    rev = require("gulp-rev-all"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    runSequence = require("run-sequence"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),

    browserSync = require("browser-sync").create();


function logError(error) {
    gutil.log(error);
    this.emit("end");
}

function isDev() {
    return process.env.NODE_ENV == "development";
}

gulp.task("clean", () => {
    return del(["./public", "./build"]);
});

gulp.task("build:assets", () => {
    return browserify({
        entries: "./assets/js/app",
        extensions: [".js", ".jsx"],
        debug: true,
        paths: ["./node_modules"]
    })
        .plugin("modular-css/browserify", {
            css : "./build/css/app.css",
            sourcemaps: true,
            after: [
                autoprefixer({browsers: ["> 1%"]})
            ],
            done: [
                cssnano()
            ]
        })
        .transform("babelify")
        .bundle().on("error", logError)
        .pipe(source("app.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(!isDev() ? uglify() : gutil.noop()).on("error", logError)
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./build/js/"));
});

gulp.task("build:img", () => {
    return gulp.src("./assets/img/**")
        .pipe(imagemin()).on("error", logError)
        .pipe(gulp.dest("./build/img/"));
});

gulp.task("revision", () => {
    return gulp.src("./build/**")
        .pipe(rev.revision({
            includeFilesInManifest: [".css", ".js", ".png", ".jpg", ".gif", ".svg"]
        }))
        .pipe(gulp.dest("./public/"))
        .pipe(rev.manifestFile())
        .pipe(gulp.dest("./public/"));
});

gulp.task("nodemon", ["default"], callback => {
    let called = false;
    return nodemon({
        script: "./bin/www",
        watch: ["app.js", "bin/www"]
    }).on("start", () => {
        if (!called) {
            called = true;
            callback();
        }
    }).on("restart", () => {
        setTimeout(() => browserSync.reload({ stream: false }), 500);
    });
});

gulp.task("browsersync-reload:all", callback => {
    runSequence("default", "browsersync-reload", callback);
});

gulp.task("browsersync-reload:assets", callback => {
    runSequence("build:assets", "revision", "browsersync-reload", callback);
});

gulp.task("browsersync-reload:img", callback => {
    runSequence("build:img", "revision", "browsersync-reload", callback);
});

gulp.task("browsersync-reload", callback => {
    browserSync.reload();
    callback();
});

gulp.task("dev", callback => {
    process.env.NODE_ENV = "development";

    runSequence("nodemon", () => {
        browserSync.init({
            proxy: "http://localhost:3000",
            port: "5000"
        });

        gulp.watch(["./assets/js/**/*.js", "./assets/js/**/*.jsx", "./assets/js/**/*.css"], ["browsersync-reload:assets"]);
        gulp.watch("./assets/img/**", ["browsersync-reload:img"]);
        gulp.watch("./views/**", ["browsersync-reload"]);
        callback();
    });
});

gulp.task("default", callback => {
    runSequence("clean", ["build:assets", "build:img"], "revision", callback);
});
