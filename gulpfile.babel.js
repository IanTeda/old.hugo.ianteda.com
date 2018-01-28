"use strict";

// Import Gulp module
import gulp from "gulp";
// Command line (CLI) argument
var argv = require("./tasks/yargs");
// Configuration file for gulp tasks
const config = require("./tasks/config");
// Lazy load plugins, save on var declaration
var plugins = require("gulp-load-plugins")(config.gulpLoadPlugins.options);

/**
 * Require Gulp Task
 * @param {task} task - What Gulp task do you require
 * @return {function} function - Returns task from module export
 */
function requireTask(task) {
  // Require Gulp task module, passing in Gulp, config, argv and plugin objects
  return require("./tasks/" + task + ".js")(
    gulp,
    config,
    argv,
    plugins
  );
}

/**
 * Require Gulp Clean Task
 * @param {directory} directory - What directory do you want cleaned
 * @return {function} function  - Returns task function from moudle export
 */
function requireCleanTask(directory) {
  // Require gulp task module
  return require("./tasks/clean")(
    directory,
    plugins
  );
}

/**
 * Images Tasks
 * Usage: gulp images:clean - Clean images from build folder
 * Usage: gulp images:build - Copy and minify images to build folder
 * Usage: gulp images       - Clean build folder, then minify and copy images to build folder
*/
gulp.task(
  "images:clean",
  requireCleanTask(
    config.images.dest + "/**/*.{png,gif,jpg}"
  )
);
gulp.task(
  "images:build",
  requireTask(
    "images"
  )
);
gulp.task(
  "images",
  gulp.series(
    "images:clean",
    "images:build"
  )
);

/**
 * Photos Tasks
 * Usage: gulp photos:clean - Clean photos from build folder
 * Usage: gulp photos:build - Copy and minify photos to build folder
 * Usage: gulp photos       - Clean build folder, then minify and copy photos to build folder
*/
gulp.task(
  "photos:clean",
  requireCleanTask(
    config.photos.dest + "/**/*.{png,gif,jpg}"
  )
);
gulp.task(
  "photos:build",
  requireTask(
    "photos"
  )
);
gulp.task(
  "photos",
    gulp.series(
      "photos:clean",
      "photos:build"
    )
);


/**
 * Clean Map Files
 * Map files used during development and are not needed in production
 * Usage: gulp maps:clean - Clean images from build folder
*/
gulp.task(
  "maps:clean",
  requireCleanTask(
    ".build/**/*.map"
  )
);

/**
 * Uglify and Compress HTML
 * Map files used during development and are not needed in production
 * Usage: gulp maps:clean - Clean images from build folder
*/

gulp.task(
  "html:build",
  requireTask(
    "html"
  )
);

/**
 * Hugo Tasks
 * Usage: gulp hugo:clean - Clean generated pages from build folder
 * Usage: gulp hugo:build - Build generated pages
 * Usage: gulp hugo       - Clean build folder, then build generated pages from source
*/
gulp.task(
  "hugo:clean",
  requireCleanTask(
    ".build/**/*"
  )
);
gulp.task(
  "hugo:build",
  requireTask(
    "hugo"
  )
);
gulp.task(
  "hugo",
  gulp.series(
    "hugo:clean",
    "hugo:build"
  )
);

/**
 * GitHub Pages Task
 * usage: gulp gh-pages - Push files to GitHub registry
 */
gulp.task(
  "gh-pages",
  requireTask("gh-pages")
);

/**
 * GitHub Pages Task
 * usage: gulp gh-pages - Push files to GitHub registry
 */
gulp.task(
  "hugo-gallery",
  requireTask("hugo-gallery")
);

gulp.task('default', gulp.series('hugo', 'maps:clean', 'html:build'));

gulp.task('deploy', gulp.series('default', 'gh-pages'));