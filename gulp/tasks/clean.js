import del from 'del';
import { path } from '../config/path.js';

export const clean = () => {
  return del( path.clean );
}