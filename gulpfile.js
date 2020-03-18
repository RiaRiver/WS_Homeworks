const {
  src,
  dest,
  watch
} = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const minifyCSS = require('gulp-csso')
const rename = require('gulp-rename')

// Static server
function bs () {
  serveSass()
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  })
  watch('./src/*.html').on('change', browserSync.reload)
  watch('./src/sass/**/*.sass', serveSass)
  watch('./src/sass/**/*.scss', serveSass)
  watch('./src/js/*.js').on('change', browserSync.reload)
}

function serveSass () {
  return src('./src/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('./src/css'))
    .pipe(browserSync.stream())
}

function mincss () {
  return src('./src/css/*.css')
    .pipe(minifyCSS())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(dest('./dist/css'))
}

exports.server = bs
exports.mincss = mincss
