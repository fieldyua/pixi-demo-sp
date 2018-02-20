var gulp = require('gulp');
var browserSync = require('browser-sync').create(); //  npm install browser-sync --save-dev


/**
 * import plugins for css
 */
var concat = require('gulp-concat');                //  npm install gulp-concat --save-dev
var prefix = require('gulp-autoprefixer');          //  npm install gulp-autoprefixer --save-dev
var cleanCSS = require('gulp-clean-css');           //  npm install gulp-clean-css --save-dev


/**
 * import plugins for js
 */
    //  npm install --save-dev babel-preset-env babel-cli
var browserify = require('browserify');             //  npm install browserify --save-dev
var babelify = require('babelify');                 //  npm install babelify --save-dev
var source = require('vinyl-source-stream');        //  npm install vinyl-source-stream --save-dev
var buffer = require('vinyl-buffer');               //  npm install vinyl-buffer --save-dev
var uglify = require('gulp-uglify');                //  npm install gulp-uglify --save-dev

var runSequence = require('run-sequence');          //  npm install run-sequence --save-dev
var sourcemaps = require('gulp-sourcemaps');        //  npm install gulp-sourcemaps --save-dev

/**
 * init browser-sync
 */
gulp.task('browserSync', function () {
    browserSync.init({
        server: 'dist'
    });
});

/**
 * copy html file to ./dist
 */
gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

/**
 * build css file
 */
gulp.task('css', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(prefix({browsers: ['last 20 versions']}))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'));
});

/**
 * build js file
 */
gulp.task('js', function () {
    return browserify('./src/js/main.js', {debug: true})
        .transform("babelify",
            { presets: ["env"],
                sourceMaps: true
            })
        .bundle()
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

/**
 *  copy images to ./dist/images
 */
gulp.task('images', function () {
    return gulp.src('src/images/**/*.png')
        .pipe(gulp.dest('dist/images/'));
});

/**
 *  copy PIXI to dist
 */
gulp.task('PIXI', function () {
   return gulp.src('node_modules/pixi.js/dist/pixi.min.js')
       .pipe(gulp.dest('dist/js/'));
});

/**
 * watchers
 */
gulp.task('watch', function () {
    gulp.watch('src/css/**/*.css', ['css', browserSync.reload]);
    gulp.watch('src/*.html', ['html', browserSync.reload]);
    gulp.watch('src/js/**/*.js', ['js', browserSync.reload]);
    gulp.watch('src/images/**/*.png', ['images', browserSync.reload]);
});

/**
 * default task
 */
gulp.task('default', function(callback) {
    runSequence(['css', 'html', 'js', 'images', 'PIXI', 'browserSync'], 'watch',
        callback
    );
});