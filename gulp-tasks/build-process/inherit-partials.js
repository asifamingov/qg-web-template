module.exports = function (gulp, plugins, config) {
    return function () {
        config.projects.map(function (element) {
            var src = [],
                basepath = [],
                files = config.inherit[element].files;
            if (config.inherit[element].inheritAll === true) {
                basepath = [`${config.basepath.src}core/assets/_components/layout/**/*.html`]
            }
            if (files != null  && files.length > 0) {
                if (!Array.isArray(files)) {
                    // Fix errors in configuration
                    files = [files];
                }
            } else {
                files = [];
            }
            // for (var i=0, len = files.length; i < len; i++) {
            //     // Isolate files
            //     files[i] = `${config.basepath.src}${element}/${files[i]}`;
            // }
            src = basepath.concat(files);
            
            return gulp.src(src, { dot: true })
                .pipe(gulp.dest(config.basepath.build + element + '/assets/includes/'));
        });
    };
};
