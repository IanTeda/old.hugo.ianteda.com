/**
 * Gulp Image Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage images in project
 */

module.exports = (gulp, config, argv, $) => {
  'use strict';

  return function() {
    return gulp
      // Image sources
      .src(config.images.srcBooks)

      // Create response copies and compress
      .pipe($.responsive(
        config.images.responsiveBooks.config,
        config.images.responsive.global
      ))

      // Add hash to image files
      .pipe($.hash())

      // Save images to destination
      .pipe(gulp.dest(config.images.dest))

      // Create hash map of images
      .pipe($.hash.manifest(config.hash.imageFile, config.hash.options))
      .on('end', function() {
        $.util.log('Book cover images hashed');
      })

      // Write has map to /data folder
      .pipe(gulp.dest('data'));
  };
};
