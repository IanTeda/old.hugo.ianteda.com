'use strict';
/**
 * Gulp Image Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage images in project
 */

var sortJSON = require('gulp-json-sort').default;

module.exports = (gulp, config, argv, $) => {
  return function() {
    let stream = gulp
      // Photo sources
      .src(config.sortJson.src)

      .pipe(sortJSON(config.sortJson.options))

      .pipe(gulp.dest(config.sortJson.dest));

    return stream;
  };
};