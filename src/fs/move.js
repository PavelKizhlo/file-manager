import { createReadStream, createWriteStream } from 'fs';
import { parse } from 'path';
import { green, red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';
import { resolveDirPath } from '../libs/pathCheck/resolveDirPath.js';
import { rm } from 'fs/promises';

export async function moveFile(pwd, args) {
  try {
    const srcPath = await resolveFilePath(pwd, args);

    if (!srcPath) return;

    const filename = parse(srcPath).base;

    const destDirname = args[1];

    const destPath = await resolveDirPath(pwd, destDirname, filename);

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath, { flags: 'wx' });

    readStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      readStream.on('end', () => {
        resolve();
      })
      writeStream.on('error', (err) => {
        if (err.code === 'EEXIST') reject();
      })
    }).then(() => {
      rm(srcPath);
      console.log(green('File was moved'));
    }).catch(() => console.log(red('Operation failed. File already exists')))

  } catch {
    console.log(red('Operation failed'));
  }
}
