import gulp from 'gulp';

// mode

global.app = {
  isBuild: process.argv.includes( '--build' ),
  isDev: !process.argv.includes( '--build' ),
}

// tasks

import { clean } from './gulp/tasks/clean.js';
import { copy } from './gulp/tasks/copy.js';
import { pug } from './gulp/tasks/pug.js';
import { sass } from './gulp/tasks/sass.js';

// script

const parallel = gulp.parallel( copy, sass, pug );
const dev = gulp.series( clean, parallel );

gulp.task( 'default', dev );