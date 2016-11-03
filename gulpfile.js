'use strict';

var gulp = require('gulp'),
    requireDir = require('require-dir'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    bowerConfig = require('./bower.json'),
    config = require('./gulp-config.js'),
    argv = require('yargs').argv,
    gulpConnect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util'),
    gulpConnectSsi = require('gulp-connect-ssi'),
    eslint = require('gulp-eslint');

config.basepath.bowerVersion = bowerConfig.version;

/* JS TASKS */
gulp.task('js', require('./gulp-tasks/build-process/scripts')(gulp, plugins, config));

/* CSS TASKS */
gulp.task('sass', require('./gulp-tasks/build-process/scss')(gulp, plugins, config));

/* MOVE FOLDERS */
gulp.task('content', require('./gulp-tasks/build-process/content')(gulp, plugins, config));
gulp.task('other:assets', require('./gulp-tasks/build-process/otherAssets')(gulp, plugins, config));
gulp.task('include-partials', ['inherit-partials'], require('./gulp-tasks/build-process/include-partials')(gulp, plugins, config));
gulp.task('inherit-partials', require('./gulp-tasks/build-process/inherit-partials')(gulp, plugins, config));

    // config.projects.map(function (element) {
    //     var src = [],
    //         basepath = [],
    //         files = config.inherit[element].files;
    //     if (config.inherit[element].inheritAll === true) {
    //         basepath = [`${config.basepath.src}core/assets/_components/layout/**/*.html`]
    //     }
    //     if (files != null  && files.length > 0) {
    //         if (!Array.isArray(files)) {
    //             // Fix errors in configuration
    //             files = [files];
    //         }
    //     } else {
    //         files = [];
    //     }
    //     // for (var i=0, len = files.length; i < len; i++) {
    //     //     // Isolate files
    //     //     files[i] = `${config.basepath.src}${element}/${files[i]}`;
    //     // }
    //     src = basepath.concat(files);

    //     return gulp.src(src, { dot: true })
    //         .pipe(gulp.dest(config.basepath.build + element + '/assets/includes/'));
    // });

/* TEST TASKS */
gulp.task('eslint', function () {
    return gulp.src(['src/assets/js/**/*.js', 'gulp-tasks/**/*.js', '!src/assets/js/**/forms.js', '!src/assets/js/**/autocomplete.js'])
        .pipe(eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failOnError());
});

/* CLEAN TASKS */
gulp.task('clean:build', function (cb) {
    del([config.basepath.build], cb);
});
gulp.task('clean:release', function (cb) {
    del([config.basepath.release], cb);
});

/* WATCH TASKS */
gulp.task('watch', function () {
    gulp.watch(config.basepath.src + '/**/*.js', ['js']);
    gulp.watch(config.basepath.src + '/**/*.scss', ['sass']);
    gulp.watch([config.basepath.src + '**/*',
        '!' + config.basepath.src + '{assets,assets/**}'
    ], ['content']);
    gulp.watch([config.basepath.src + '*', config.basepath.src + '*' + '*', config.basepath.src + '*' + '*'], ['other:assets']);
});

/* RELEASE TASKS */
gulp.task('release:assets', require('./gulp-tasks/release-process/assets')(gulp, plugins, config));
gulp.task('release:content', require('./gulp-tasks/release-process/content')(gulp, plugins, config));
gulp.task('publish:swe', require('./gulp-tasks/release-process/publish')(gulp, plugins, config));

/* TASK RUNNERS */
gulp.task('default', ['content', 'js', 'sass', 'other:assets', 'include-partials']);
gulp.task('build', ['default']);
gulp.task('release', ['release:assets', 'release:content']);

/* SSI */
// Open using local server
gulp.task('generate', require('./gulp-tasks/build-process/server.js')(gulp, plugins, config, gulpConnect, gulpConnectSsi, argv));

// Convert to Jinja tasks
gulp.task('delay', function (cb) {
    setTimeout(cb, 5000);
});
gulp.task('ssi-to-jinja', function (cb) {
    var spawn = require('child_process').spawn;
    var child = spawn('python', ['ssi_to_jinja2.py', './build/swe'], {cwd: process.cwd()});
    var stdout = '';
    var stderr = '';
    child.stdout.setEncoding('utf8');

    child.stdout.on('data', function (data) {
        stdout = stdout + data;
        gutil.log(data);
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        stderr = stderr + data;
        gutil.log(gutil.colors.red(data));
        gutil.beep();
    });

    child.on('close', function (code) {
        gutil.log('Done with exit code', code);
    });
    cb();
});
gulp.task('build-jinja', function (cb) {
    runSequence('default', 'delay', 'ssi-to-jinja', cb);
});