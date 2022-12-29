var gulp = require("gulp");
var browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", () => {
    return gulp
        .src("src/scss/*.scss")
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(autoprefixer())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task(
    "start",
    gulp.series("sass", function () {
        browserSync.init({
            server: "./",
        });

        gulp.watch("src/scss/*.scss", gulp.series("sass"));
        gulp.watch("./*.html").on("change", browserSync.reload);
        gulp.watch("src/js/stylePage/*.js", browserSync.reload);
        gulp.watch("src/js/linkPage/*.js", browserSync.reload);
    })
);

gulp.task("default", gulp.series("start"));
