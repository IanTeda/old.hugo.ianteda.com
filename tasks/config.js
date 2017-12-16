'use strict';

let mqpacker = require('css-mqpacker');
let csswring = require('csswring');
let pngquant = require('imagemin-pngquant');

const assets = 'assets/';
const build = '.build/';
const tmp = '.tmp/';
const hstatic = 'static/';
const nodeModules = 'node_modules/';
const src = 'src/';
const data = 'data/';

module.exports = {
  ghPages: {
    src: '.build/**/*',
    options: {
      branch: 'gh-pages',
      cacheDir: '.tmp',
      remoteUrl: 'git@github.com:IanTeda/hugo.ianteda.com.git',
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
    src: build + '/**/*.html',
    dest: build,
  },
  htmlmin: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
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
    extensions: src + 'images/**/*.{png,gif,jpg}',
    src: src + 'images/**/*.{png,gif,jpg}',
    dest: hstatic + 'images',
    responsive: {
      config: {
        '*': [
          {
            width: 600,
            rename: {
              suffix: '@mobile',
              extname: '.jpg',
            },
            withoutEnlargement: false,
          }, {
            width: 992,
            rename: {
              suffix: '@tablet',
              extname: '.jpg',
            },
            withoutEnlargement: false,
          }, {
            width: 1200,
            rename: {
              suffix: '@desktop',
              extname: '.jpg',
            },
            withoutEnlargement: false,
          }, {
            width: 2880,
            rename: {
              suffix: '@highres',
              extname: '.jpg',
            },
            withoutEnlargement: false,
          },
        ],
      },
    },
  },
  imagemin: {
    options: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
    },
  },
  photos: {
    extensions: src + 'photos/4K Stogram/ianteda/**/*.{png,gif,jpg}',
    src: src + 'photos/4K Stogram/ianteda/**/*.{png,gif,jpg}',
    dest: hstatic + 'photos',
    json_options: {
      filename: 'data/photos-list.json',
      strip: /^.+\/?\\?ianteda\/?\\?/ //create just file names by removing everything from left of ianteda/ folder in 4K Stogram
    },
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
