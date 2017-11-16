"use strict";
/**
 * Gulp Jekyll Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage HTML in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    let stream = gulp
      .src(config.html.src)
      .pipe($.size({title: 'Html:'}))
      .pipe($.htmlmin(config.htmlmin.options))
      .pipe($.size({title: 'Minimised:'}))
      .pipe(gulp.dest(config.html.dest))
      .pipe($.gzip(config.gzip.options))
      .pipe($.size({
        title: 'GZiped:',
        zip: true,
      }))
      .pipe(gulp.dest(config.html.dest));

    return stream;
  };
};
