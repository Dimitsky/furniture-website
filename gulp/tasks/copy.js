import gulp from 'gulp';
import gulpChanged from 'gulp-changed';
import { path } from '../config/path.js'

export const copy = () => {
  return gulp.src( path.src.assets )
    .pipe( gulpChanged( path.dist.assets ) )
    .pipe( gulp.dest( path.dist.assets ) )
}