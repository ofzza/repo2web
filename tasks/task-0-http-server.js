// =====================================================================================================================
// GULP TASK: HTTP Server
// =====================================================================================================================

// Require dependencies
const connect = require('gulp-connect');

// Initialize tasks
module.exports = (gulp) => {

  // JSCS code-style task
  gulp.task('server', () => {
    return connect.server({
      port: 3001,
      root: './dist',
      livereload: true
    });
  });

  // Return registered tasks
  return { };

};
