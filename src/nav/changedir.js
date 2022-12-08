import { homedir } from 'os';
import { resolve } from 'path';
import { checkPathExists } from '../libs/pathCheck/checkPathExists.js';
import { red } from '../libs/color/color.js';

export async function changeDir(pwd, args) {
  if (!args.length) {
    return homedir;
  }

  const newPath = resolve(pwd, args[0]);
  const pathExists = await checkPathExists(newPath);

  if (!pathExists) {
    console.log(red('Invalid input. Please, check path'));
    return pwd;
  }

  return newPath;
}
