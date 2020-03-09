'use strict';
module.exports = function (gulp, plugins, es, config) {
  var replace = '\\/assets\\/versionName\\/';
  var re = new RegExp(replace, 'g');

  var replace2 = '\\/assets\\/v4\\/';
  var re2 = new RegExp(replace2, 'g');
  return function (cb) {
    return es.merge([
      gulp.src(`${config.basepath.release}/docs/*.html`)
        .pipe(plugins.replace(re, `${config.webpath}${config.versionName}/`))
        .pipe(gulp.dest(`${config.basepath.release}/docs/`)),

      gulp.src(`${config.basepath.release}/docs/pagemodels/*.html`)
        .pipe(plugins.replace(re2, `${config.webpath}${config.versionName}/`))
        .pipe(gulp.dest(`${config.basepath.release}/docs/pagemodels/`)),
    ]);
  };
};
