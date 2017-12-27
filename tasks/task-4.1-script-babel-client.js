// =====================================================================================================================
// GULP TASK: Transpile ES6 code
// =====================================================================================================================

// Require dependencies
const path        = require('path'),
      util        = require('gulp-util'),
      browserify  = require('browserify'),
      babelify    = require('babelify'),
      source      = require('vinyl-source-stream'),
      buffer      = require('vinyl-buffer'),
      minify      = require('gulp-minify'),
      sourcemaps  = require('gulp-sourcemaps');

// Initialize tasks
module.exports = (gulp) => {

  // Compose source root path
  const sourceRoot = `file:///${ path.join(__dirname, '../').replace('/mnt/e/', 'e:/') }`;

  // Define ES6 transcompilation task
  gulp.task('build@script-babel-client', () => {
    return browserify({
      entries: './src/client/index.js',
      extensions: ['.js'],
      debug: !util.env.production
    })
      .transform(babelify, { presets: ['babel-preset-esnext'] })
      .bundle()
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(!util.env.production ? sourcemaps.init({ loadMaps: true }) : util.noop())
      .pipe(!util.env.production ? sourcemaps.write('.', { includeContent: false, sourceRoot }) : util.noop())
      .pipe(util.env.production ? minify({ noSource: true, ext: { min: '.js' } }) : util.noop())
      .pipe(gulp.dest('./dist/client'));
  });

  // Return registered tasks
  return {
    build: 'build@script-babel-client',
    watch: './src/**/*.js'
  };

};
