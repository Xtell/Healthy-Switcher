let baseDir = "src"

const gulp         = require('gulp');
const scss         = require('gulp-sass');
const csso         = require('gulp-csso');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync  = require('browser-sync');
const uglify       = require('gulp-uglify-es').default;
const concat       = require('gulp-concat');
const rename       = require('gulp-rename');
const plumber      = require('gulp-plumber');
const imagemin     = require('gulp-imagemin');
const webp         = require('imagemin-webp');
const svgstore     = require('gulp-svgstore');
const extReplace   = require('gulp-ext-replace');
const posthtml     = require('gulp-posthtml');
const include      = require('posthtml-include');
const del          = require('del');
const cache        = require('gulp-cache');

    const paths = {
        styles: {
            src: baseDir + '/scss/main.scss',
            dest: "build/css/"
        },
        scripts: {
            src: [
                "node_modules/jquery/dist/jquery.min.js",
                "node_modules/picturefill/dist/picturefill.min.js",
                baseDir + '/js/libs/modernizr-custom.js',
                baseDir + '/js/main.js',
            ],
            dest: 'build/js/'
        },
        images: {
            src: baseDir + '/images/*.*',
            icons: baseDir + '/images/icons/*.*',
            dest: 'build/images/'
        },
        html: {
            src: baseDir + '/*.html',
            dest: 'build/'
        },
        fonts: {
            src: baseDir + '/fonts/*.{woff2,woff}',
            dest: 'build/fonts/'
        },
        cssOutputName: 'main.min.css',
        jsOutputName:  'main.min.js',
        
    }

gulp.task('serve', function(done) {
    browserSync.init({
        server: "build",
        nofity: false
    });
});

gulp.task('styles', function () {
    return src(paths.styles.src)
    .pipe(scss())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename(paths.cssOutputName))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts.src)
    .pipe(concat(paths.jsOutputName))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
});
gulp.task('imageOptimize', function() {
    return gulp.src([paths.images.src, '!' + paths.images.icons])
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 90, progressive: true}),
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.svgo()
    ]))
    .pipe(gulp.dest(paths.images.dest))
});
gulp.task('webp', function() {
    return gulp.src(paths.images.src +'.*{jpg,png}')
    .pipe(imagemin([
        webp({quality: 90})
    ]))
    .pipe(extReplace('.webp'))
    .pipe(gulp.dest(paths.images.dest));
});
gulp.task('svgsprite', function() {
    return src(paths.images.icons)
    .pipe(
        imagemin([
            imagemin.svgo()
        ]))
    .pipe(svgstore({
        inlineSvg: true,
    }))
    .pipe(rename("sprite.svg"))
    .pipe(dest(paths.images.dest))
})
gulp.task('images', gulp.series('imageOptimize', 'webp', 'svgsprite'));

gulp.task('html', function () {
    return gulp.src(paths.html.src)
    .pipe(posthtml([
        include()
    ]))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
});
gulp.task('watch', function(){
    gulp.watch(baseDir + '/scss/**/*', gulp.series('styles'));
    gulp.watch(baseDir + '/js/**/*', gulp.series('scripts'));
    gulp.watch(baseDir + '/*.html', gulp.series('html'));
});
gulp.task('cleanBuild', function(){
    return del("build/");
});
gulp.task('copy', function() {
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
});
gulp.task('build', series('cleanBuild', 'copy', 'images', 'styles', 'scripts', 'html'));
gulp.task('default', series('build', parallel('serve', 'watch')));
