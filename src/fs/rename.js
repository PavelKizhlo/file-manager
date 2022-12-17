import { rename } from 'fs/promises'
import { join, parse } from 'path';
import { green, red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';
import { checkPathExists } from '../libs/pathCheck/checkPathExists.js';

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

    const newPathExists = await checkPathExists(newPath);

    if (newPathExists) {
      console.log(red('Invalid input. File already exists'));
      return;
    }

    await rename(oldPath, newPath);

    console.log(green('File was renamed'));
  } catch {
    console.log(red('Operation failed'));
  }
}
