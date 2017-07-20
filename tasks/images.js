'use strict';
/**
 * Gulp Image Task
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
      .src(
        (argv.theme ? 'themes/' + argv.theme + '/' : '') +
        config.images.src
      )

      // Minimise images
      .pipe($.imagemin(config.imagemin.options))

      // Add hash to image files
      .pipe($.hash())

      // Save images to destination
      .pipe(gulp.dest(
        (argv.theme ? 'themes/' + argv.theme + '/' : '') +
        config.images.dest
      ))

      // Create hash map of images
      .pipe($.hash.manifest('hash-images.json'))
      .on('end', function() {
        $.util.log('Images hashed');
      })

      // Put hash map in the data directory
      .pipe(gulp.dest((argv.theme ? 'themes/' + argv.theme: '') + '/data'));

    return stream;
  };
};
