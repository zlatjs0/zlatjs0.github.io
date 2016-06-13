var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps');

var src = 'src',
    dist = 'dist';

var paths = {
    scss: src + '/scss/**/*.scss'
};

// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
    return gulp.src(dist)
        .pipe(webserver());
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
    return gulp.src(paths.scss)
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dist + '/css'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.scss, ['compile-sass']);
    gulp.watch(dist + '/**').on('change', livereload.changed);
});

//기본 task 설정
gulp.task( 'default', [
    'server',
    'compile-sass',
    'watch'
]);
