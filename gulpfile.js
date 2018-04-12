const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cssFiles = '_scss/*';
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const siteRoot = '_site';
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('css', () => {
    var plugins = [
        autoprefixer({browsers: ['last 2 version']}),
        cssnano()
    ];
  gulp.src(cssFiles)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss(plugins))
      .pipe(concat('all.css'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('_includes'))
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });
  gulp.watch(cssFiles, ['css']);
});


gulp.task('default', ['css', 'jekyll', 'serve']);
