// =====================================================================================================================
// GULP TASK: Copy LESS files
// =====================================================================================================================

// Require dependencies
const util    = require('gulp-util'),
      less    = require('gulp-less'),
      minify  = require('gulp-clean-css');

// Initialize tasks
module.exports = (gulp) => {

  // Define LESS copy task
  gulp.task('build@style-less', () => {
    return gulp
      .src('./src/**/*.less')
      .pipe(less())
      .pipe(util.env.production ? minify() : util.noop())
      .pipe(gulp.dest('./dist'));
  });

  // Return registered tasks
  return {
    build: 'build@style-less',
    watch: './src/**/*.less'
  };

};
