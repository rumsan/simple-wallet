const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const bs = require('browser-sync').create();
const fs = require('fs');

let config = null;

const loadConfig = () => JSON.parse(fs.readFileSync('./build.json', 'utf8'));

const buildJs = () => {
  config = loadConfig();
  return webpackStream({
    entry: config.js.entry,
    mode: 'none',
    optimization: {
      minimize: !!config.isProd,
    },
    output: {
      filename: '[name].js',
    },
  }).pipe(gulp.dest(config.js.outputPath));
};

const buildVendors = () => {
  config = loadConfig();
  return webpackStream({
    entry: config.vendors.entry,
    mode: 'none',
    optimization: {
      minimize: true,
    },
    output: {
      filename: config.vendors.outputFile,
    },
  }).pipe(gulp.dest(config.vendors.outputPath));
};

function browserSync(done) {
  bs.init({
    server: {
      baseDir: './',
      middleware(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
      },
    },
  });
  done();
}

function browserSyncReload(done) {
  bs.reload();
  done();
}

function watchFiles() {
  gulp.watch('./gulpfile.js', process.exit);
  gulp.watch('./build.json', gulp.series(buildJs));

  gulp.watch('./src/vendors/**/*', gulp.series(buildVendors));
  gulp.watch('./src/**/*', gulp.series(buildJs));
  gulp.watch(['./dist/**/*', './index.html'], gulp.series(browserSyncReload));
}

const build = gulp.series(buildVendors, buildJs);
const watch = gulp.parallel(buildVendors, buildJs, watchFiles, browserSync);

exports.vendors = buildVendors;
exports.build = build;
exports.watch = watch;
exports.default = watch;
