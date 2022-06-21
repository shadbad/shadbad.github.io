import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import bs from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import prefix from 'gulp-autoprefixer';
import cssmin from 'gulp-cssnano';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import clean from 'gulp-clean';

const sass = gulpSass(dartSass);
const browserSync = bs.create();

// #region BrowserSync

function browsersyncServe(callback) {
    browserSync.init({
        server: { baseDir: "./" },
        cookies: { stripDomain: false },
        port: 3000,
    });
    callback();
}

function browsersyncReload(callback) {
    browserSync.reload();
    callback();
}

// #endregion

// #region image optimization

function imgCleanup() {
    return gulp
        .src("public/images/{!(_src), /**/}")
        .pipe(clean());
}

function imgSvgWebpCopy() {
    return gulp
        .src('public/images/_src/**/*.+(svg|webp)')
        .pipe(gulp.dest('public/images/'));
}

function imgOptimization() {
    return gulp
        .src('public/images/_src/**/*.+(png|jpg|gif)')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/'));
}

// #endregion

// #region Development

function _devBuildStyles() {
    return gulp
        .src("public/styles/**/[!_]*.scss")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(gulp.dest((file) => file.base));
}

function _devWatchTask() {
    gulp.watch("**/*.html", browsersyncReload);
    gulp.watch(["public/styles/**/*.scss"], gulp.series(_devBuildStyles, browsersyncReload));
}

// #endregion

// #region Publish

function publishStyles() {
    return gulp
        .src("public/styles/app.scss")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(prefix())
        .pipe(gulp.dest("public/styles/"))
        .pipe(cssmin())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("public/styles/"));
}

function publishScripts() {
    const scripts = ["public/scripts/app.js"];

    return gulp
        .src(scripts)
        .pipe(plumber())
        .pipe(concat("app.min.js"))
        .pipe(terser())
        .pipe(gulp.dest("public/scripts/"));
}

// #endregion

export let publish = gulp.series(publishStyles, publishScripts);

export let optimizeImages = gulp.series(imgCleanup, imgSvgWebpCopy, imgOptimization);

export default gulp.series(browsersyncServe, _devBuildStyles, _devWatchTask);
