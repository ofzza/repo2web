// =====================================================================================================================
// GULP TASK: Copy SCSS files
// =====================================================================================================================

// Require dependencies
const util    = require('gulp-util'),
      sass    = require('gulp-sass'),
      minify  = require('gulp-clean-css');

// Initialize tasks
module.exports = (gulp) => {

  // Define SCSS copy task
  gulp.task('build@style-scss', () => {
    return gulp
      .src('./src/**/*.scss')
      .pipe(sass())
      .pipe(util.env.production ? minify() : util.noop())
      .pipe(gulp.dest('./dist'));
  });

  // Return registered tasks
  return {
    build: 'build@style-scss',
    watch: './src/**/*.scss'
  };

};
