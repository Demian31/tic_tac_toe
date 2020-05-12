let gulp = require('gulp');
let postcss = require('gulp-postcss');

gulp.task('css', function () {

  return gulp.src('src/style.css')
    // ...
    .pipe(postcss([
      // ...
      require('tailwindcss'),
      require('autoprefixer'),
      // ...
    ]))
    // ...
    .pipe(gulp.dest('build/'))
})