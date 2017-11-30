// =====================================================================================================================
// GULP TASK: Copy CSS files
// =====================================================================================================================

// Require dependencies
const util    = require('gulp-util'),
      minify  = require('gulp-clean-css');

// Initialize tasks
module.exports = (gulp) => {

  // Define CSS copy task
  gulp.task('build@style-css', () => {
    return gulp
      .src('./src/**/*.css')
      .pipe(util.env.production ? minify() : util.noop())
      .pipe(gulp.dest('./dist'));
  });

  // Return registered tasks
  return {
    build: 'build@style-css',
    watch: './src/**/*.css'
  };

};
