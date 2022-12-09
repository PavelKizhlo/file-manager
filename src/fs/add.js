import { writeFile } from 'fs/promises';
import { green, red } from '../libs/color/color.js';
import { resolve } from 'path';

export async function addFile(pwd, args) {
  try {
    if (!args.length) {
      console.log(red('Invalid input. Please, enter filename'));
      return;
    }

    const destPath = resolve(pwd, args[0]);

    await writeFile(destPath, '', { flag: 'wx' });
    console.log(green('File was created'));
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(red('FS operation failed. File already exists'));
    } else {
      console.log(red('FS operation failed'))
    }
  }
}
