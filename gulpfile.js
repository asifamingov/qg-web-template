'use strict';

// Core
let gulp            = require('gulp');
let config          = require('./gulp/gulp-config.js');
let del             = require('del');
let webpack         = require('webpack');
let argv            = require('yargs').argv;
let plugins         = require('gulp-load-plugins')();
let es              = require('event-stream');
let runSequence     = require('run-sequence');
let replace         = require('gulp-replace');
    // bowerConfig = require('./bower.json'),
    // runSequence = require('run-sequence'),
    // gutil       = require('gulp-util'),
    // gulpConnectSsi = require('gulp-connect-ssi'),
    // eslint      = require('gulp-eslint'),
    // 
    // include     = require('gulp-include'),
    // 

// For testing
let karmaServer     = require('karma').Server;
let fsPath          = require('fs-path');
let eslintReporter  = require('eslint-html-reporter');
let gulpConnectSsi  = require('gulp-connect-ssi');
let gulpConnect     = require('gulp-connect');

let jsDest = "";

/* SSI */
// Open using local server
gulp.task('local-server', require('./gulp/build-tasks/local-server.js')(gulp, plugins, config, gulpConnect, gulpConnectSsi, argv));

/* CLEAN TASKS */
gulp.task('clean-build', (cb) => {
    return del([config.basepath.build], cb);
});
gulp.task('clean-release', (cb) => {
    return del([config.basepath.release], cb);
});

/* BUILD TASKS */
gulp.task('scss', require('./gulp/build-tasks/scss')(gulp, plugins, config));
gulp.task('html', require('./gulp/build-tasks/html')(gulp, plugins, config));
gulp.task('includes', require('./gulp/build-tasks/includes')(gulp, plugins, config));
gulp.task('includes-cdn', require('./gulp/build-tasks/includes-cdn')(gulp, plugins, config));
gulp.task('js', require('./gulp/build-tasks/js')(gulp, plugins, config, 'build'));
gulp.task('other-assets', require('./gulp/build-tasks/other-assets')(gulp, plugins, config, es));

gulp.task('default', ['html', 'includes', 'includes-cdn', 'scss', 'js', 'other-assets']);
gulp.task('build', ['default']);
gulp.task('build:clean', (cb) => {
    runSequence('clean-build', 'default', cb);
});

/* WATCH TASSKS */
gulp.task('watch', function () {
    gulp.watch([config.basepath.src + '/**/*.js'], ['js']);
    gulp.watch([config.basepath.src + '/**/*.html'], ['html']);
    gulp.watch([config.basepath.src + '/**/*.scss'], ['scss']);
    gulp.watch([config.basepath.src + '/assets/includes/**/*.html'], ['includes']);
    gulp.watch([config.basepath.src + '*', config.basepath.src + '*' + '*', config.basepath.src + '*' + '*'], ['other-assets']);
});

/* RELEASE TASKS */
gulp.task('scss-src', require('./gulp/release-tasks/scss-src')(gulp, plugins, config));
gulp.task('assets-core', require('./gulp/release-tasks/assets-core')(gulp, plugins, config));
gulp.task('assets-includes', require('./gulp/release-tasks/assets-includes')(gulp, plugins, config));
gulp.task('assets-includes-cdn', require('./gulp/release-tasks/assets-includes-cdn')(gulp, plugins, config));

// TODO: Asif, this is not a very elegant solution AT ALL, don't like it:

jsDest = `${config.basepath.release}/assets/${config.version}/js/`;
gulp.task('js-assets', require('./gulp/build-tasks/js')(gulp, plugins, config, jsDest));
jsDest = `${config.basepath.release}/template-local/assets/${config.version}/js/`
gulp.task('js-template-local', require('./gulp/build-tasks/js')(gulp, plugins, config, jsDest));
gulp.task('release-js', ['js-assets', 'js-template-local']);

// /END ugly JS release method
gulp.task('delay', function (cb) {
    setTimeout(cb, 0);
});

gulp.task('copy-element', require('./gulp/release-tasks/copy-element')(gulp, plugins, config));
gulp.task('release', (cb) => { 
    runSequence(
        'build:clean', 'clean-release',
        ['scss-src', 'assets-core', 'assets-includes', 'assets-includes-cdn', 'release-js'], // 
        // 'delay', // To fix webpack bugs
        'copy-element', // Done last in order to over-ride assets-includes
        cb
    );
});

/* TEST TASKS */
gulp.task('test:config:e2e', require('./gulp/test-tasks/e2e')(gulp, plugins, config));
gulp.task('test:browserstack', ['local-server', 'test:config:e2e']);
gulp.task('test:unit', require('./gulp/test-tasks/unit')(gulp, plugins, config, karmaServer));
gulp.task('test:eslint', require('./gulp/test-tasks/lint')(gulp, plugins, config, fsPath, eslintReporter));
gulp.task('test:reports', require('./gulp/test-tasks/reports')(gulp, plugins, config));
gulp.task('test', ['test:unit', 'test:eslint', 'test:browserstack', 'test:reports']);
