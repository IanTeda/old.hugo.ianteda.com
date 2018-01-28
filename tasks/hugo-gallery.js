/**
 * GULP HUGO GALLERY TASK
 * Write Markdown file for each image file to use as a gallery.
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage images in project
 */

 const hugoGallery = require('gulp-hugo-gallery');

module.exports = (gulp, config, argv, $) => {
    'use strict';

    return function() {
      let stream = gulp
        .src(config.hugoGallery.src)
        .pipe(hugoGallery())
        .pipe(gulp.dest(config.hugoGallery.dest));

      return stream;
    };
  };
