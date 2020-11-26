const gulp = require('gulp');

const fs = require('fs');
const beeper = require('beeper');
const del = require('del');

const touch = require('gulp-touch-cmd');
const concat = require('gulp-concat');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');

const terser = require('gulp-terser');

const sourcemaps = require('gulp-sourcemaps');

const bsServer = require('browser-sync').create();


function cleanDist(done) {
  del.sync('./_dist/**/*');
  done();
};

// BrowserSync
function browserSync(done) {
  bsServer.init({
    ghostMode: false,
    ui: false,
    server: { baseDir: './_dist' },
    open: true,
    notify: false,
    online: false,
  });
  done();
};

// BrowserSync Reload
function browserSyncReload(done) {
  bsServer.reload();
  done();
};

function copyBootstrapScss() {
  return (
    gulp
      .src('./node_modules/bootstrap/scss/**')
      .pipe(gulp.dest('./_src/css/vendor/bootstrap'))
  );
};

function cssMerge() {
  return (
    gulp
      .src('./_src/css/init.scss')
      .pipe(sass.sync().on('error', function(){beeper()}).on('error', sass.logError))
      .pipe(postcss([
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({ autoprefixer: { flexbox: 'no-2009' }, stage: 3 }),
        require('postcss-normalize'),
        require('cssnano')
      ]))
      .pipe(concat('mc-bootstrap.min.css'))
      .pipe(gulp.dest('./_dist/css/'))
      .pipe(bsServer.stream())
      .pipe(touch())
  );
};

function jsVendor() {
  return (
    gulp
      .src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js'
      ])
      .pipe(sourcemaps.init())
      .pipe(concat('mc-bootstrap.min.js'))
      .pipe(terser())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./_dist/js/'))
  );
};

function jsBespoke() {
  return (
    gulp
      .src([
        './_src/js/main.js',
        './_src/js/components/**/*.js'
      ])
      .pipe(sourcemaps.init())
      .pipe(concat('mc-components.min.js'))
      .pipe(terser())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./_dist/js/'))
  );
};

function copyStatic() {
  return (
    gulp
      .src('./_src/static/**/*')
      .pipe(gulp.dest('_dist'))
  );
};



function watchFiles() {
    gulp.watch('./_src/css/*.scss', cssMerge);
    gulp.watch('./_src/js/*.js', jsBespoke);
    gulp.watch('./_src/**/*').on('change', copyStatic);
    gulp.watch('./_dist/index.html').on('change', bsServer.reload)
}

const build = gulp.series(cleanDist, copyBootstrapScss, gulp.parallel(cssMerge, jsVendor, jsBespoke, copyStatic));


const watch = watchFiles;
const serve = gulp.parallel(watchFiles, browserSync);

exports.build = build;
exports.serve = serve;
exports.watch = watch;
exports.default = watch; //if nothing else, do a regular dev watch
