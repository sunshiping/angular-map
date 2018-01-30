var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    gulpif = require('gulp-if');


// 样式处理任务
gulp.task('styles', function () {
    return gulp.src('public/html/css/*.css')    //引入所有CSS
        .pipe(concat('main.css'))           //合并CSS文件
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/dist/css'))      //完整版输出
        .pipe(rename({suffix: '.min'}))   //重命名
        .pipe(minifycss())                  //CSS压缩
        .pipe(gulp.dest('public/dist/css'))      //压缩版输出
        .pipe(notify({message: '样式文件处理完成'}));
});

// 如果需要通过scss文件编译css，就使用这段代码
// gulp.task('styles', function() {
//   return gulp.src('public/html/css/main.scss')
//     .pipe(sass({ style: 'expanded', }))
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(gulp.dest('public/dist/styles'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(gulp.dest('public/dist/styles'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// JS处理任务
gulp.task('scripts', function () {
    return gulp.src('js2/*.js')      //引入所有需处理的JS
        // .pipe(jshint.reporter('default'))         //S代码检查
        // .pipe(concat('main.js'))                  //合并JS文件
        .pipe(rename({suffix: '.min'}))         //重命名
        // .pipe(gulp.dest('public/dist/js'))        //完整版输出
        .pipe(uglify())                           //压缩JS
        .pipe(gulp.dest('public/js'))        //压缩版输出
        .pipe(notify({message: 'JS文件处理完成'}));
});

// // 图片处理任务
// gulp.task('images', function () {
//     return gulp.src('public/html/img/*')        //引入所有需处理的JS
//         .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))      //压缩图片
//         // 如果想对变动过的文件进行压缩，则使用下面一句代码
//         // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//         .pipe(gulp.dest('public/dist/img'))
//         .pipe(notify({message: '图片处理完成'}));
// });
//
// // 目标目录清理
// gulp.task('clean', function () {
//     return gulp.src(['public/dist/css', 'public/js', 'public/img'], {read: false})
//         .pipe(clean());
// });
//
// // 预设任务，执行清理后，
// gulp.task('default', ['clean'], function () {
//     gulp.start('styles', 'scripts', 'images');
// });
//
// // 文档临听
// gulp.task('watch', function () {
//
//     // 监听所有.scss文档
//     //   gulp.watch('src/styles/**/*.scss', ['styles']);
//
//     // 监听所有css文档
//     gulp.watch('public/html/css/*.css', ['styles']);
//
//     // 监听所有.js档
//     gulp.watch('public/html/js/*.js', ['scripts']);
//
//     // 监听所有图片档
//     gulp.watch('public/html/img/*', ['images']);
//
//
// });