import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { EOL } from 'os';
import { red } from '../libs/color/color.js';
import { resolveFilePath } from '../libs/pathCheck/resolveFilePath.js';

export async function calcHash(pwd, args) {
  try {
    const srcPath = await resolveFilePath(pwd, args);

    if (!srcPath) return;

    const hash = await createHash('sha256');
    const readStream = createReadStream(srcPath, { encoding: 'utf-8' })

    readStream.pipe(hash).setEncoding('hex').pipe(process.stdout);

    await new Promise(resolve => {
      readStream.on('end', () => {
        process.stdout.write(EOL);
        resolve();
      })
    })
  } catch {
    console.log(red('Operation failed'))
  }
}
