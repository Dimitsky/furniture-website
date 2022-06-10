import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import gulpCssMin from 'gulp-cssmin';
import gulpIf from 'gulp-if';
import gulpRename from 'gulp-rename';
import { path } from '../config/path.js';

const s = gulpSass( dartSass );

export const sass = () => {
  return gulp.src( path.src.sass )
    .pipe( s().on( 'error', s.logError ) )
    .pipe( gulpIf( app.isBuild, gulpCssMin() ) )
    .pipe( gulpIf( app.isBuild, gulpRename( { suffix: '.min' } ) ) )
    .pipe( gulp.dest( path.dist.css ) )
}