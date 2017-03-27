'use-strict';

module.exports = function (gulp, plugins, config, mode) {
  return function () {
    config.projects.map((element) => {
      var buildDest = `${config.basepath.build}/assets/${config.version}/js/`;
      // let releaseDest

      return gulp.src(`${config.basepath.src}/assets/_project/js/main.js`)
        .pipe(plugins.webpack({
          output: {
            filename: 'main.js'
          },
          devtool: 'source-map',
          module: {
            loaders: [{
              test: /\.js$/,
              exclude: /(node_modules)/,
              loader: 'babel',
              query: {
                presets: ['es2015']
              }
            }]
          },
          output: {
            path: '',
            filename: '',
          }
        }))
        .pipe(gulp.dest(buildDest));
    });
  };
};
