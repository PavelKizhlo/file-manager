import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { red } from '../libs/color/color.js';
import { checkIsFile } from '../libs/pathCheck/checkIsFile.js';

export async function list(pwd) {
  try {
    const files = await readdir(pwd);
    const fileTable = [];
    const dirTable = [];

    for (const file of files) {
      const filePath = resolve(pwd, file);
      const isFile = await checkIsFile(filePath);

      if (isFile) {
        fileTable.push({Name: file, Type: 'file'});
      } else {
        dirTable.push({ Name: file, Type: 'directory' });
      }

      fileTable.sort((a, b) => a.Name > b.Name ? 1 : -1);
      dirTable.sort((a, b) => a.Name > b.Name ? 1 : -1);
    }

    console.table([...dirTable, ...fileTable]);
  } catch {
    console.log(red('Operation failed'))
  }
}
