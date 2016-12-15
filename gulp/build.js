'use strict';

var gulp = require('gulp');
var gUtil = require('gulp-util');
var gzip = require('gulp-gzip');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
    return gulp.src([
        paths.src + '/app/**/*.html',
        paths.tmp + '/app/**/*.html'
    ])
        .pipe($.if(function (file) {
                return $.match(file, ['!**/examples/*.html']);
            },
            $.minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
        )
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'app',
            root: 'app'
        }))
        .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: paths.tmp + '/partials',
        addRootSlash: false
    };

    var htmlFilter = $.filter(['*.html']);
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(paths.tmp + '/serve/*.html')
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe($.inject(partialsInjectFile, {
            starttag: '<!-- inject:gmap -->',
            endtag: '<!-- endinject -->',
            transform: function (filepath) {
                var gsrc = 'https://maps.googleapis.com/maps/api/js?key=' + paths.googleMapKey + '&libraries=places';
                return '<script src="'+ gsrc +'"></script>';
            }
        }))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.replace('${env}', gulp.env))
        .pipe($.replace('${mapApiKey}', paths.mapApiKey))
        .pipe($.replace('${zomatoApiKey}', paths.zomatoApiKey))
        .pipe($.replace('${googleMapKey}', paths.googleMapKey))
        .pipe($.uglify({preserveComments: $.uglifySaveLicense, mangle: false}))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size({title: paths.dist + '/', showFiles: true}));
});


gulp.task('html-local', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: paths.tmp + '/partials',
        addRootSlash: false
    };

    var htmlFilter = $.filter(['*.html', '!/src/app/elements/examples/*.html']);
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(paths.tmp + '/serve/*.html')
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe($.inject(partialsInjectFile, {
            starttag: '<!-- inject:gmap -->',
            endtag: '<!-- endinject -->',
            transform: function (filepath) {
                var gsrc = 'https://maps.googleapis.com/maps/api/js?key=' + paths.googleMapKey + '&libraries=places';
                return '<script src="'+ gsrc +'"></script>';
            }
        }))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe(jsFilter.restore())
        .pipe($.replace('${mapApiKey}', paths.mapApiKey))
        .pipe($.replace('${zomatoApiKey}', paths.zomatoApiKey))
        .pipe($.replace('${googleMapKey}', paths.googleMapKey))
        .pipe($.replace('${env}', gulp.env))
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size({title: paths.dist + '/', showFiles: true}));
});

gulp.task('assets', function () {
    return gulp.src(paths.src + '/assets/**/*')
        .pipe(gulp.dest(paths.dist + '/assets/'));
});

gulp.task('images', function () {
    return gulp.src(paths.src + '/assets/img/**/*')
        .pipe(gulp.dest(paths.dist + '/assets/img/'));
});

gulp.task('plugins', function () {
    return gulp.src(paths.src + '/assets/plugins/**/*')
        .pipe(gulp.dest(paths.dist + '/assets/plugins/'));
});

gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('data', function () {
    return gulp.src('src/**/data/*.json')
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size());
});

gulp.task('misc', function () {
    return gulp.src(paths.src + '/favicon.png')
        .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('clean', function (done) {
    $.del([paths.dist + '/', paths.tmp + '/'], {'force': true}, done);
});

gulp.task('buildapp', ['html', 'assets', 'fonts', 'misc', 'data']);
gulp.task('buildapp-local', ['html-local', 'assets', 'fonts', 'misc', 'data']);
