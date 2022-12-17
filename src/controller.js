import { red, yellow } from './libs/color/color.js';
import { goUpDir } from './nav/dirup.js';
import { changeDir } from './nav/changedir.js';
import { list } from './nav/list.js';
import { getOsInfo } from './os/os.js';
import { read } from './fs/read.js';
import { calcHash } from './hash/hash.js';
import { addFile } from './fs/add.js';
import { renameFile } from './fs/rename.js';
import { copyFile } from './fs/copy.js';
import { deleteFile } from './fs/delete.js';
import { moveFile } from './fs/move.js';
import { brotli } from './zlib/brotli.js';


// Uses closure for passing additional data into 'line' listener
function commandController(pwd) {
  return async (input) => {
    const { command, args } = parseInput(input);

    switch (command) {
      case 'up':
        pwd = await goUpDir(pwd);
        break;
      case 'cd':
        pwd = await changeDir(pwd, args);
        break;
      case 'ls':
        await list(pwd);
        break;
      case 'cat':
        await read(pwd, args);
        break;
      case 'add':
        await addFile(pwd, args);
        break;
      case 'rn':
        await renameFile(pwd, args);
        break;
      case 'cp':
        await copyFile(pwd, args);
        break;
      case 'mv':
        await moveFile(pwd, args);
        break;
      case 'rm':
        await deleteFile(pwd, args);
        break;
      case 'os':
        getOsInfo(args);
        break;
      case 'hash':
        await calcHash(pwd, args);
        break;
      case 'compress':
      case 'decompress':
        await brotli(pwd, command, args);
        break;
      case '':
        console.log(yellow("You didn't print anything"))
        break;
      case '.exit':
        process.stdin.emit('end');
        return;
      default:
        console.log(red('Invalid input'))
    }

    console.log(yellow(`You are currently in ${pwd}`))
  }
}

function parseInput(input) {
  const re = new RegExp(/\s+(?=(?:"[^"]*"|[^"])*$)/);
  const parsedInputArr = input.trim().split(re);
  const command = parsedInputArr[0];
  const args = parsedInputArr
      .slice(1)
      .map(arg => arg.replace(/(^")|("$)/g, ''));

  return { command, args };
}

export { commandController }
