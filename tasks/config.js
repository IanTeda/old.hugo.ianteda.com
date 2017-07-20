'use strict';

let autoprefixer = require('autoprefixer');
let mqpacker = require('css-mqpacker');
let csswring = require('csswring');
let pngquant = require('imagemin-pngquant');

const assets = 'assets/';
const build = 'build/';
const tmp = '.tmp/';
const hstatic = 'static/';
const nodeModules = 'node_modules/';
const release = '.release';
const src = 'src/';

module.exports = {
  downloads: {
    src: assets + '/downloads/**/*',
    dest: tmp + assets + 'downloads',
  },
  fonts: {
    src: [
      nodeModules + 'font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
      assets + 'fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
    ],
    dest: tmp + assets + 'fonts',
  },
  ghPages: {
    options: {
      branch: 'master',
      cacheDir: release,
      remoteUrl: 'git@github.com:IanTeda/ianteda.github.io.git',
    },
  },
  gulpLoadPlugins: {
    options: {
      // when set to true, the plugin will log info to console
      DEBUG: false,

      // the glob(s) to search for in package.json
      pattern: ['gulp-*', 'gulp.*', 'del', 'merge2', 'shelljs'],

      // if true, transforms hyphenated plugins names to camel case
      camelize: true,

      // whether the plugins should be lazy loaded on demand
      lazy: true,
    },
  },
  gzip: {
    options: {
      append: true,
    },
  },
  html: {
    src: build + '**/*.html',
    dest: build,
  },
  htmlmin: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
    },
  },
  inject: {
    ignorePath: tmp,
    options: {
      read: false,
    },
    scripts: {
      target: '_includes/scripts.html',
      references: tmp + assets + 'scripts/*.js',
      destination: '_includes/',
    },
    styles: {
      target: '_includes/styles.html',
      references: tmp + assets + 'styles/*.css',
      destination: '_includes/',
    },
  },
  images: {
    src: src + 'images/**/*.{png,gif,jpg}',
    dest: hstatic + 'images',
  },
  imagemin: {
    options: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
    },
  },
  jekyll: {
    dest: build,
    deploy: build + '**/*',
    assets: build + assets,
    tmp: tmp + assets,
  },
  jsdoc3: {
    src: [
      './gulp/README.md',
      './gulp/**/*.js',
    ],
    options: {
      opts: {
        encoding: 'utf8',
        destination: './gulp/docs',
        recurse: true,
        access: 'all',
      },
      plugins: [
        'node_modules/jsdoc/plugins/markdown',
      ],
      templates: {
        cleverLinks: false,
        monospaceLinks: false,
        default: {
          outputSourceFiles: true,
        },
        path: 'ink-docstrap',
        theme: 'cerulean',
        navType: 'vertical',
        linenums: true,
        dateFormat: 'MMMM Do YYYY, h:mm:ss a',
      },
    },
  },
  postcss: {
    processors: [
      autoprefixer({
        browsers: ['last 1 version']
      }),
      mqpacker,
      csswring,
    ],
  },
  scripts: {
    filename: 'main.js',
    src: [
      nodeModules + 'jquery/dist/jquery.js',
      nodeModules + 'wow.js/dist/wow.js',
      nodeModules + 'fitvids/fitvids.js',
      assets + 'scripts/main.js',
    ],
    dest: tmp + assets + 'scripts',
    build: build + assets + 'scripts',
  },
  styles: {
    filename: 'main.css',
    css: [
      nodeModules + '/animate.css/animate.css',
      nodeModules + '/font-awesome/css/font-awesome.css',
      assets + 'styles/screen.css',
      assets + 'styles/syntax.css',
    ],
    sass: assets + 'sass/main.scss',
    dest: tmp + assets + 'styles',
  },
  uglify: {
    options: {
    },
  },
};
