var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var cleanCss = require('gulp-clean-css');
var sass = require('gulp-sass');


//SCSS合并、压缩
gulp.task('scssmin', function () {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(cleanCss()) // 又多了一步，压缩
        .pipe(gulp.dest('css/'));
});


gulp.task('house_css2', function () {
    return gulp.src([
        'css/animate.min.css',
        'css/style.css'
    ])
        .pipe(concat('style2.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css/min/'));
});


//压缩图片
gulp.task('Imagemin', function () {
    gulp.src('img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('img/min/'));
});


// JS处理任务
gulp.task('default', function () {
    return gulp.src(['app/lib/jquery/1.11.3/jquery-1.11.3.min.js',
        'app/lib/angular/1.5.0/angular.min.js',
        'app/lib/angular/1.5.0/angular-route.min.js',
        'app/lib/angular/1.5.0/angular-touch.min.js',
        'app/lib/angular/1.5.0/angular-animate.js',
        'app/lib/weui/script/weui.js',
        'app/lib/ui-bootstrap/1.2.1/ui-bootstrap-tpls-1.2.1.min.js',
        'app/lib/ng-file-upload/12.0.1/ng-file-upload-shim.min.js',
        'app/lib/ng-file-upload/12.0.1/ng-file-upload.min.js',
        'app/lib/nginfinitescroll/1.2.0/ng-infinite-scroll.min.js',
        'app/lib/mobiscroll/datetime/js/mobiscroll.custom-2.17.0.min.js'
    ])
        .pipe(concat('oa.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/lib/'));
});

gulp.task('ng', function () {
    return gulp.src([
        'lib/angular/1.4.7/angular.min.js',
        'lib/angular/1.4.7/angular-route.min.js',
        'lib/angular/1.4.7/angular-touch.min.js',
        'lib/nginfinitescroll/1.2.0/ng-infinite-scroll.min.js'
    ])
        .pipe(concat('ng.js'))
        .pipe(uglify())
        .pipe(gulp.dest('lib/'));
});

gulp.task('lib_crm', function () {
    return gulp.src([
        'lib/jquery/jquery-2.1.4.min.js',
        'lib/angular/1.4.7/angular.min.js',
        'lib/angular/1.4.7/angular-route.min.js',
        'lib/angular/1.4.7/angular-touch.min.js',
        'lib/angular/1.4.7/angular-sanitize.min.js',
        'lib/ngInfiniteScroll/1.2.0/ng-infinite-scroll.min.js',
        'lib/mobiscroll/calendar/js/mobiscroll.custom-2.17.0.min.js'
    ])
        .pipe(concat('crm.js'))
        .pipe(uglify())
        .pipe(gulp.dest('lib/'));
});

gulp.task('daily', function () {
    return gulp.src([
        'oa/daily/app.js',
        'oa/daily/services.js',
        'oa/daily/controllers.js',
        'oa/daily/filters.js',
        'oa/daily/directives.js'
    ])
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('oa/daily/'));
});

//二手房列表
gulp.task('house_css', function () {
    return gulp.src([
        'app/lib/bootstrap/3.3.6/css/bootstrap.min.css',
        'app/lib/weui/style/weui.min.css',
        'app/lib/swiper/css/swiper-3.3.1.min.css',
        'css/select.css',
        'css/css/map_filter.css',
        'css/style.css',
        'css/house.css'

    ])
        .pipe(concat('house.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css/min/'));
});

//个人中心
gulp.task('task', function () {
    return gulp.src([
        'oa/task/app.js',
        'oa/task/services.js',
        'oa/task/controllers.js',
        'oa/task/filters.js',
        'oa/task/directives.js'
    ])
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('oa/task/'));
});


gulp.task('mine_css', function () {
    return gulp.src([
        'app/lib/bootstrap/3.3.6/css/bootstrap.min.css',
        'app/lib/weui/style/weui.min.css',
        'css/concern.css',
        'css/material.css',
        'css/record.css',
        'css/message.css',
        'css/evaluate.css',
        'css/mine.css'
    ])
        .pipe(concat('mine.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css/min/'));
});

//求购求租
gulp.task('checkin', function () {
    return gulp.src([
        'oa/checkin/app.js',
        'oa/checkin/services.js',
        'oa/checkin/controllers.js',
        'oa/checkin/filters.js',
        'oa/checkin/directives.js'
    ])
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('oa/checkin/'));
});


gulp.task('buyRent_css', function () {
    return gulp.src([
        'app/lib/bootstrap/3.3.6/css/bootstrap.min.css',
        'app/lib/weui/style/weui.min.css',
        'css/style.css'
    ])
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css/min/'));
});

//发布房源
gulp.task('wf', function () {
    return gulp.src([
        'oa/wf/app.js',
        'oa/wf/services.js',
        'oa/wf/controllers.js',
        'oa/wf/filters.js',
        'oa/wf/directives.js'
    ])
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('oa/wf/'));
});


gulp.task('release_css', function () {
    return gulp.src([
        'app/lib/bootstrap/3.3.6/css/bootstrap.min.css',
        'app/lib/weui/style/weui.min.css',
        'app/lib/mobiscroll/datetime/css/mobiscroll.custom-2.17.0.min.css',
        'css/style.css'
    ])
        .pipe(concat('release.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css/min/'));
});
