const gulp = require('gulp')
const del = require('del')
const spawn = require('child_process').spawn
const uglify = require('gulp-uglify')
const cssmin = require('gulp-cssmin')
const babel = require('gulp-babel')
const path = require('path')

const ignoreJS = [
    'com/**/echarts/*.js',
    'com/**/bpmn/*.js', 
    'com/**/jsoneditor/*.js'
];
const ignore = ignoreJS.map(i => '!' + i);

// js转es5并压缩
gulp.task('mini:js', function (done) {
  return gulp.src(['com/**/*.js', '!com/**/test/*.js', ...ignore], {base: 'com/'})
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('docs/jqc-release/com'));
})
// css压缩
gulp.task('mini:css', function () {
  return gulp.src(['com/**/*.css', '!com/**/test/*.css'], {base: 'com/'})
    .pipe(cssmin())
    .pipe(gulp.dest('docs/jqc-release/com'));
})

// js、css并行压缩
gulp.task('mini', gulp.parallel('mini:js', 'mini:css', (done) => {
  done()
  console.log('代码压缩中。。。')
}))

// 删除jqc-release内的文件
gulp.task('clean', function (done) {
  del([
    'docs/jqc-release/com'
  ]).then(res => {
    done()
  })
})

// 复制其它文件
gulp.task('copy', function () {
  return gulp.src(['com/**/*', '!com/**/test/**', '!com/**/*.js', '!com/**/*.css'], {base: 'com/'})
    .pipe(gulp.dest('docs/jqc-release/com'))
})

// 不处理第三方js代码
gulp.task('copy:big-js', function () {
  return gulp.src(ignoreJS, {base: 'com/'})
    .pipe(gulp.dest('docs/jqc-release/com'))
})

gulp.task('default', gulp.series('clean', 'copy', 'copy:big-js', 'mini', function (done) {
  done()
  console.log('压缩完成！')
  console.log('\n\n存放至   ' + path.join(__dirname, 'docs/jqc-release\n\n'))
}))
