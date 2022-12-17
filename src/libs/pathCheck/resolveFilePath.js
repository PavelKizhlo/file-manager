import { red } from '../color/color.js';
import { resolve } from 'path';
import { checkPathExists } from './checkPathExists.js';
import { checkIsFile } from './checkIsFile.js';

export async function resolveFilePath(pwd, args) {
  if (!args.length) {
    console.log(red('Invalid input. Please, enter path to file'));
    return;
  }

  const filePath = resolve(pwd, args[0]);
  const pathExists = await checkPathExists(filePath);

  if (!pathExists) {
    console.log(red('Input invalid. Please, check path'));
    return;
  }

  const isFile = await checkIsFile(filePath);

  if (!isFile) {
    console.log(red('Input invalid. You should pass filename instead dirname'));
    return;
  }

  return filePath;
}
