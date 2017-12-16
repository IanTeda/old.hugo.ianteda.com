'use strict';
/**
 * Gulp Image Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage images in project
 */

var filenamesToJson = require('gulp-filenames-to-json');

module.exports = (gulp, config, argv, $) => {
  return function() {
    let stream = gulp
      // Image sources
      .src(config.photos.src)

      // Create response copies and compress
      .pipe($.responsive(
        config.images.responsive.config,
        config.images.responsive.global
      ))

      // Minimise images
      .pipe($.imagemin(config.imagemin.options))

      // Add hash to image files
      .pipe($.hash())

      // Save images to destination
      .pipe(gulp.dest(config.photos.dest))

      // Create hash map of images
      .pipe($.hash.manifest('photos.json'))
      .on('end', function() {
        $.util.log('Images hashed');
      })

      // Write has map to /data folder
      .pipe(gulp.dest('data'));

    return stream;
  };
};
