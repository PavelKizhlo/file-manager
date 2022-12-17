import { join, resolve } from 'path';
import { red } from '../color/color.js';
import { checkPathExists } from './checkPathExists.js';

export async function resolveDirPath(pwd, dirname, filename) {
  const destDirname = resolve(pwd, dirname);

  if (!destDirname) {
    console.log(red('Invalid input. Please, enter destination dirname'));
    return;
  }

  const destDirnameExists = await checkPathExists(destDirname);

  if (!destDirnameExists) {
    console.log(red('Invalid input. Please, check destination dirname path'));
    return;
  }

  return join(destDirname, filename);
}
