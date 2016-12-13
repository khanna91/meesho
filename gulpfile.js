'use strict';

var gulp = require('gulp');

gulp.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e'
};

require('require-dir')('./gulp');

gulp.task('buildlocal', ['clean'], function () {
    gulp.paths.googleMapKey = 'AIzaSyBV-fObQiqREESuJkBPz380TYyRuxaEl68';
    gulp.env = 'local';
    gulp.start('buildapp-local');
});

gulp.task('builddev', ['clean'], function () {
    gulp.paths.googleMapKey = 'AIzaSyAfvi8QnLhHSmNQktOfo_i3nlV4n3fJi8k';
    gulp.env = 'staging';
    gulp.start('buildapp');
});

gulp.task('buildprod', ['clean'], function () {
    gulp.paths.googleMapKey = 'AIzaSyAfvi8QnLhHSmNQktOfo_i3nlV4n3fJi8k';
    gulp.env = 'production';
    gulp.start('buildapp');
});
