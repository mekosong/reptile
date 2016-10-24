var gulp = require('gulp')
var webpack = require('gulp-webpack')
var named = require('vinyl-named')

var webpackConfig =require('./webpack.config')


var appList = ['main']


gulp.task('default', ['bundle'], function() {
  console.log('done')
})

gulp.task('bundle', function() {
  return gulp.src(mapFiles(appList, 'js'))
    .pipe(named())
    .pipe(webpack(getConfig({watch:false})))
    .pipe(gulp.dest('public/assets/'))
})

gulp.task('watch', function() {
  return gulp.src(mapFiles(appList, 'js'))
    .pipe(named())
    .pipe(webpack(getConfig({watch: true})))
    .pipe(gulp.dest('public/assets/'))
})


/**
 * @private
 */
function getConfig(opt) {
  if (opt&&opt.watch) {
    webpackConfig.watch=true;
    return webpackConfig
  }else{
    webpackConfig.watch=false;
    return webpackConfig
  }
}

/**
 * @private
 */
function mapFiles(list, extname) {
  return list.map(function (app) {return 'src/' + app + '.' + extname})
}