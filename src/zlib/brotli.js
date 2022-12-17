import { createReadStream, createWriteStream } from 'fs';
import { parse, resolve } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { green, red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';
import { checkPathExists } from '../libs/pathCheck/checkPathExists.js';

export async function brotli(pwd, command, args) {
  try {
    const srcPath = await resolveFilePath(pwd, args);

    if (!srcPath) return;

    if (!args[1]) {
      console.log(red('Invalid input. Please, enter destination dirname'));
      return;
    }

    const destPath = resolve(pwd, args[1]);
    const destDirname = parse(destPath).dir;

    const destPathExists = await checkPathExists(destDirname);

    if (!destPathExists) {
      console.log(red('Invalid input. Please, check destination filename'));
      return;
    }

    await new Promise((resolve, reject) => {
      const readStream = createReadStream(srcPath);
      const writeStream = createWriteStream(destPath, { flags: 'wx' });

      let brotliStream;

      if (command === 'compress') {
        brotliStream = createBrotliCompress();
      } else {
        brotliStream = createBrotliDecompress();
      }

      readStream.pipe(brotliStream).pipe(writeStream);

      brotliStream.on('error', () => {
        reject("Invalid input. This file can't be decompressed");
      })

      writeStream.on('close', () => {
        resolve(`File was ${command}ed`);
      })

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
