var gulp = require("gulp");
//sass
var sass = require("gulp-sass");
//起服务
var server = require("gulp-webserver");
//压缩js
var js = require("gulp-uglify");
//合并
var concat = require("gulp-concat");
//压缩css
var clean = require("gulp-clean-css");

//sass
gulp.task("devSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
})

//起服务

function serverFun(serverPath) {
    return gulp.src("src")
        .pipe(server({
            port: 3300,
            open: true,
        }))
}
//监听css
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"))
});

gulp.task("devServer", function() {
    return serverFun("src")
})

//default任务
gulp.task("default", gulp.series("devSass", "devServer", "watch"))


//js
gulp.task("js", function() {
    return gulp.src("./src/js/*.js")
        .pipe(concat("all.js"))
        .pipe(js())
        .pipe(gulp.dest("./bulid/dist/js"))
});

//css
gulp.task("dCss", function() {
    return gulp.src("./src/css/*.css")
        .pipe(clean())
        .pipe(gulp.dest("./bulid/dist/css"))
})

gulp.task("bulid", gulp.series("js", "dCss"))