import { rm } from 'fs/promises'
import { green, red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';

export async function deleteFile(pwd, args) {
  try {
    const srcPath = await resolveFilePath(pwd, args);

    if (!srcPath) return;

    await rm(srcPath);
    console.log(green('File was deleted'));
  } catch {
    console.log(red('Operation failed'));
  }
}
