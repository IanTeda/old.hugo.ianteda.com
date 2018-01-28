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
    let stream = gulp
      // Photo sources
      .src(config.photos.src)

      // Create JSON with list of photo file names
      .pipe($.toJson(config.photos.json_options))

      // Create response copies and compress photos
      .pipe($.responsive(
        config.images.responsive.config,
        config.images.responsive.global
      ))

      // Add hash to photo files
      .pipe($.hash())

      // Save photos to destination
      .pipe(gulp.dest(config.photos.dest))

      // Create hash map JOSN of photos
      .pipe($.hash.manifest('photos_hash.json'))
      .on('end', function() {
        $.util.log('Images hashed');
      })

      // Write hash map JSON file to /data folder
      .pipe(gulp.dest('data'));

    return stream;
  };
};
