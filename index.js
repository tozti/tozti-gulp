'use strict'

let gulp = require('gulp')
let del = require('del')
let gulpif = require('gulp-if')
let uglify = require('gulp-uglify')
let imagemin = require('gulp-imagemin')
let cssmin = require('gulp-clean-css')
let sass = require('gulp-sass')

let vuffer = require('vinyl-buffer')
let source = require('vinyl-source-stream')
let sourcemaps = require('gulp-sourcemaps')

let watchify = require('watchify')
let browserify = require('browserify')


module.exports = function (options) {
    options = options || {}
    options.fonts    = options.fonts    || ['assets/fonts/**'],
    options.images   = options.images   || ['assets/img/**'],
    options.styles   = options.styles   || ['assets/sass/style.scss']
    options.scripts  = options.scripts  || ['src/index.js']
    options.external = options.external || []

    let production = process.env.NODE_ENV == 'production'

    let bundler = browserify({
            entries: options.scripts,
            debug: !production
        })
        .external(options.external)
        .transform('browserify-shim', {
            'vue': 'global:Vue'
            'tozti': 'global:tozti'
        })
        .transform('vueify', {babel: {presets: ['es2015']}})
        .transform('babelify', {presets: ['es2015']})

    let bundle = b => {
        b.bundle()
            .pipe(source('build.js'))
            .pipe(vuffer())
            .pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
            .pipe(gulpif(production, uglify()))
            .pipe(gulpif(!production, sourcemaps.write('.')))
            .pipe(gulp.dest('dist'))
    }

    // Empty the build folder.
    gulp.task('clean', function() {
        return del(['dist/*'])
    })

    // Compile the Javascript source files.
    gulp.task('scripts', ['clean'], function () {
        return bundle(bundler)
    })

    // Copy the fonts to the dist folder.
    gulp.task('fonts', ['clean'], function () {
        return gulp.src(options.fonts)
            .pipe(gulp.dest('dist/fonts'))
    })

    // Optimize the images to reduce their size.
    gulp.task('images', ['clean'], function() {
        return gulp.src(options.images)
           .pipe(imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
            }))
           .pipe(gulp.dest('dist/img'))
    })

    // Transform the SASS files into regular CSS files and minify them.
    gulp.task('sass', function () {
        return gulp.src(options.styles)
           .pipe(sass().on('error', sass.logError))
           .pipe(gulpif(production, cssmin()))
           .pipe(gulp.dest('dist/css'))
    })

    // Compile the Javascript sources and the assets, and watch
    // for changes to the files.
    gulp.task('watch', function () {
        let b = watchify(bundler)
        b.on('update', _ => bundle(b))
        bundle(b)

        gulp.watch(options.fonts, ['fonts'])
        gulp.watch(options.images, ['images'])
        gulp.watch(options.styles, ['sass'])
    })

    // Compile the Javascript sources and the assets.
    gulp.task('build', ['scripts', 'images', 'sass', 'fonts'])

    // The default action when launching gulp.
    gulp.task('default', ['build'])
}
