'use strict';
/**
 * Filename-to-JSON Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage images in project
 */

module.exports = (gulp, config, argv, $) => {
  return function() {
    let stream = gulp
      // Image sources
      .src(config.photos.src)

      // Parse src and put into JSON file
      // gulp-load-plugin camelCases hyphens
      .pipe($.toJson(config.photos.json_options));

    return stream;
  };
};
