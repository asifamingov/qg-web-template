'use strict';

module.exports = function (gulp, plugins, config, dest, local = false, relpath = false) {
  return function (cb) {
    const src = [
      `${config.basepath.src}/assets/_project/_blocks/layout/**/*.html`,
    ];
      //.concat(config.build.excludes); //remove concat excludes, remove from gulp-config.json also

    const relLink = {
      regex: new RegExp('="/assets/', 'g'),
      replacement: '="assets/',
    };
    const cdnLink = {
      regex: new RegExp('="/assets/', 'g'),
      replacement: '="https://static.qgov.net.au/assets/',
    };

    // if (!Array.isArray(dest)) {
    //   dest = [dest];
    // }

    const projectAssets = new RegExp('="(/)?assets/_project/', 'g');

    // Test if the element is set to deploy this component
    return gulp.src(src, { dot: true })
      .pipe(plugins.include({ hardFail: true }))
      .on('error', console.log)
      .pipe(plugins.replace(projectAssets, `="$1assets/${config.versionName}/latest/`)) // Replace '_project' with 'v3'
      .pipe(plugins.if(local !== true, plugins.replace(projectAssets, `="https://static.qgov.net.au/assets/${config.versionName}/latest/`)))
      .pipe(plugins.if(local !== true, plugins.replace(cdnLink.regex, cdnLink.replacement)))
      .pipe(plugins.if(relpath === true, plugins.replace(relLink.regex, relLink.replacement)))
      .pipe(gulp.dest(`${config.basepath.build}/${dest}/`));
  };
};
