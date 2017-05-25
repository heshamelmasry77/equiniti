var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var connect = require('gulp-connect');


// any file with an extension of coffee
var coffeeSources = ['components/coffee/*.coffee'];

var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss'];

var htmlSources = ['builds/development/*.html'];
gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))

});

gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload())

});

gulp.task('compass', function () {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
        })
            .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload())


});

// to watch my files
gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch('builds/development/js/*.json', ['json']);
});

// task to start up the server
gulp.task('connect', function () {
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
});

// task to watch and reload when i change my static files
gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(connect.reload())

});
// task to watch and reload when i change any json files
gulp.task('json', function () {
    gulp.src('builds/development/js/*.json')
        .pipe(connect.reload())

});

gulp.task('default', ['coffee', 'js','json', 'compass', 'watch', 'connect', 'html']);