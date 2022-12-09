import { createReadStream, createWriteStream } from 'fs';
import { parse } from 'path';
import { green, red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';
import { resolveDirPath } from '../libs/pathCheck/resolveDirPath.js';

export async function copyFile(pwd, args) {
  try {
    const srcPath = await resolveFilePath(pwd, args);

    if (!srcPath) return;

    const filename = parse(srcPath).base;

    const destDirname = args[1];

    const destPath = await resolveDirPath(pwd, destDirname, filename);

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath, { flags: 'wx' });

    readStream.pipe(writeStream);

    await new Promise(resolve => {
      readStream.on('end', () => {
        console.log(green('File was copied'));
        resolve();
      })
      writeStream.on('error', (err) => {
        if (err.code === 'EEXIST') {
          console.log(red('Operation failed. File already exists'));
        } else {
          throw err;
        }
        resolve();
      })
    })
  } catch {
    console.log(red('Operation failed'));
  }
}
