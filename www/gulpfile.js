const gulp = require("gulp");
const concat = require("gulp-concat");

const sass = require("gulp-sass")(require("sass"));
const combineScss = require("gulp-scss-combine");
const purgecss = require("gulp-purgecss");

const paths = {
    sass: {
        src: ["src/sass/**/*.scss"],
        dest: "./dist/static",
        filename: "bundle.css"
    }
};

const sassOptions = {
    outputStyle: "compressed"
};

gulp.task("default", () => {
    return gulp.src(paths.sass.src)
        .pipe(combineScss())
        .pipe(concat(paths.sass.filename))
        .pipe(sass(sassOptions).on("error", sass.logError))
        // .pipe(purgecss({
        //     content: ["src/nunjucks/**/*.njk"]
        // }))
        .pipe(gulp.dest(paths.sass.dest));
});