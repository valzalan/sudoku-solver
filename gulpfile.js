"use strict";
//------------------------------
//    Plugins & dependencies
//------------------------------

const gulp = require( "gulp" );

//    JavaScript bundling
const browserify = require( "browserify" ),
      uglify = require( "gulp-uglify" ),
      babelify = require('babelify');

//    Utilities
const source = require( "vinyl-source-stream" ),
      buffer = require( "vinyl-buffer" ),
      sourcemaps = require( "gulp-sourcemaps" ),
      log = require( "gulplog" );

//    CSS
const sass = require( "gulp-sass" ),
      autoprefixer = require( "gulp-autoprefixer" );

//------------------------------------------
//    Javascript bundling and transforms
//------------------------------------------

gulp.task( "js", function () {
    return browserify( "./src/scripts/app.js" )
        .transform( "babelify", {
            presets: [ "env" ]
        })
        .on( "error", log.error )
        .bundle()
        .pipe( source( "bundle.js" ))
        .pipe( buffer())
        .on( "error", log.error )
        .pipe( gulp.dest( "./dist/scripts/" ));
});

//--------------------------------------
//    Sass compiling, and autoprefix
//--------------------------------------

gulp.task( "sass", function() {

 return gulp.src( "./src/styles/**/*.scss" )
  .pipe( sourcemaps.init() )
  .pipe( sass( {
    outputStyle: "compressed"
  }).on( "error", sass.logError ))
  .pipe( autoprefixer( {
    browsers: [ "last 2 versions" ],
    cascade: false
  }))
  .pipe( sourcemaps.write( "./" ))
  .pipe( gulp.dest( "./dist/styles/" ));
});

//-------------------
//    Watch tasks
//-------------------

gulp.task( "watch", function() {
   gulp.watch( "./src/scripts/**/*.js", [ "js" ] );
   gulp.watch( "./src/styles/**/*.scss", [ "sass" ] );
});

//--------------------
//    Default task
//--------------------

gulp.task( "default", [ "bundle-js", "sass" ] );
