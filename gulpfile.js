var gulp = require('gulp'); // 引入组件
var minifycss = require('gulp-minify-css'), // CSS压缩
uglify = require('gulp-uglify'), // js压缩
concat = require('gulp-concat'), // 合并文件
rename = require('gulp-rename'), // 重命名
// clean = require('gulp-clean'), //清空文件夹
// minhtml = require('gulp-htmlmin'), //html压缩
jshint = require('gulp-jshint'), //js代码规范性检查
imagemin = require('gulp-imagemin'); //图片压缩


// gulp.task('html', function(){
//     return gulp.src('src/*html')
//         .pipe(minhtml({collapseWhitespace: true}))
//         .pipe(gulp.dest('dist'))
// })

gulp.task('css', function(){
    gulp.src('./src/css/*.css')
        .pipe(concat('merge.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
})
gulp.task('js', function(){
    gulp.src('./src/css/*.js')
        .pipe(concat(merge.js))
        .pipe(minifyjs())
        .pipe(gulp.dest('dist/src'))
})
gulp.task('img', function(){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
})
gulp.task('build', ['html','css','js','img'])