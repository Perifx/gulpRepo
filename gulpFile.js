const {src,dest,series,parallel,watch}=require('gulp')
// dest:  للفولدر  stream جديد ولو مش موجود بتعمل نسخه dir بتعمل  لل 
const htmlmin=require('gulp-htmlmin')
var globs={
    html:"my-project/*.html",
    css:"my-project/css/**/*.css",
    js:"my-project/js/**/*.js"
}
function htmlTask(){
// readFile
return src("my-project/*.html")// streame رجعت 
// minify
.pipe(htmlmin({collapseWhitespace:true,removeComments:true})) 
// dist folder & copy
.pipe(dest("dist"))


}

exports.html=htmlTask

// css task
var concat =require('gulp-concat')
const cleanCss=require('gulp-clean-css')
function cssTask(){

    return src("my-project/css/**/*.css")

    .pipe(cleanCss({ level: { 1: { specialComments: 0 } } })) //minify css
    .pipe(dest("dist/css"))

}
exports.css=cssTask




// js task
const terser=require('gulp-terser')

function jsTask(){
    return src("my-project/js/**/*.js")
    .pipe(concat("script.min.js")) // اسم الفايل
    .pipe(terser())
.pipe(dest("dist/js"))

}
exports.js=jsTask


// images task
const imagemin=require('gulp-imagemin')
function imagesTask(){


    return src("my-project/img/*")
    .pipe(imagemin())
    .pipe(dest("dist/img"))


}
exports.img=imagesTask




var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}

function reloadTask(done) {
  browserSync.reload()
  done()
}
// watch task
function watchTask(){
    watch(globs.html,htmlTask);
    watch(globs.css,htmlTask);
    watch("my-project/js/**/*.js",jsTask);
    watch("my-project/img/*",jsTask);
}



exports.default= series (parallel(cssTask,htmlTask,imagesTask,jsTask),serve,watchTask)