import { createReadStream } from 'fs'
import { EOL } from 'os';
import { red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';

export async function read(pwd, args) {
  try {
    const srcPath = await resolveFilePath(pwd, args);

    if (!srcPath) return;

    const readStream = createReadStream(srcPath,{ encoding: 'utf-8' });

    readStream.pipe(process.stdout);

    await new Promise(resolve => {
      readStream.on('end', () => {
        process.stdout.write(EOL);
        resolve();
      });
    })
  } catch {
    console.log(red('Operation failed'))
  }
}
