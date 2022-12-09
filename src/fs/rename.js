import { rename } from 'fs/promises'
import { join, parse } from 'path';
import { green, red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';

export async function renameFile(pwd, args) {
  try {
    const oldPath = await resolveFilePath(pwd, args);

    if (!oldPath) return;

    const newFilename = args[1];

    if (!newFilename) {
      console.log(red('Invalid input. Please, enter new filename'));
      return;
    }

    const newPath = join(parse(oldPath).dir, newFilename);
    await rename(oldPath, newPath);

    console.log(green('File was renamed'));
  } catch {
    console.log(red('Operation failed'));
  }
}
