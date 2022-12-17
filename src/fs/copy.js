import { createReadStream, createWriteStream } from 'fs';
import { parse } from 'path';
import { green, red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';
import { resolveDirPath } from '../libs/pathCheck/resolveDirPath.js';

export async function copyFile(pwd, args) {
  try {
    const srcPath = await resolveFilePath(pwd, args);

    if (!srcPath) return;

    if (!args[1]) {
      console.log(red('Invalid input. Please, enter destination dirname'))
      return;
    }

    const filename = parse(srcPath).base;

    const destDirname = args[1];

    const destPath = await resolveDirPath(pwd, destDirname, filename);

    if (!destPath) return;

    await new Promise((resolve, reject) => {
      const readStream = createReadStream(srcPath);
      const writeStream = createWriteStream(destPath, { flags: 'wx' });

      readStream.pipe(writeStream);

      writeStream.on('close', () => {
        resolve('File was copied');
      });

      writeStream.on('error', (err) => {
        if (err.code === 'EEXIST') {
          reject('Operation failed. File already exists');
        }
      })
    }).then(msg => console.log(green(msg)))
      .catch(msg => console.log(red(msg)));
  } catch {
    console.log(red('Operation failed'));
  }
}
