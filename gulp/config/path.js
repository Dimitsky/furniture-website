import * as nodePath from 'path';

const rootFolder = nodePath.basename( nodePath.resolve() ),
      distFolder = './dist',
      srcFolder  = './src';

export const path = {
  dist: {
    assets: `${distFolder}/assets/`, 
    css: `${distFolder}/assets/css/`, 
    html: `${distFolder}/`,
  }, 
  src: {
    assets: `${srcFolder}/assets/**/*.*`, 
    sass: `${srcFolder}/components/_style/style.sass`, 
    pug: `${srcFolder}/components/_pages/*.pug`,
  }, 
  clean: distFolder,
  distFolder: distFolder, 
  rootFolder: rootFolder,
  srcFolder: srcFolder,
}