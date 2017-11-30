// =====================================================================================================================
// GULP TASK: Copy HTML
// =====================================================================================================================

// Require dependencies
const util    = require('gulp-util'),
      minify  = require('gulp-htmlmin');

// Initialize tasks
module.exports = (gulp) => {

  // Define HTML copy task
  gulp.task('build@html', () => {
    return gulp
      .src('./src/**/*.html')
      .pipe(util.env.production ? minify({ collapseWhitespace: true, conservativeCollapse: true }) : util.noop())
      .pipe(gulp.dest('./dist'));
  });

  // Return registered tasks
  return {
    build: 'build@html',
    watch: './src/**/*.html'
  };

};
