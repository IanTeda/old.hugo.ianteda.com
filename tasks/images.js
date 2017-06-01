"use strict";
/**
 * Gulp Image Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage images in project
 */

var hash = require('gulp-hash');

module.exports = (gulp, config, argv, $) => {
  return function() {
    var stream = gulp
      // Image sources
      .src(config.images.src)
      // Minimise images
      .pipe($.imagemin(config.imagemin.options))
      .pipe(hash())
      // Save images to destination
      .pipe(gulp.dest(config.images.dest))
      // Create hash map
      .pipe(hash.manifest("hash.json"))
      .on('end', function(){ $.util.log('Images hashed'); })
      //Put the map in the data directory
      .pipe(gulp.dest("data/css"));

    return stream;
  };
};
