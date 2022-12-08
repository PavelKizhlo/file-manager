import {EOL, cpus, homedir, userInfo, arch} from 'os';

import { green, red } from '../libs/color/color.js';

export const getOsInfo = (args) => {
  if (!args.length) {
    console.log(red('Invalid input. Command must have at least one argument'));
    return;
  }

  const osArg = args[0];
  const prefix = osArg.slice(0, 2);

  if (prefix !== '--') {
    console.log(red('Invalid input. Arguments should start with "--"'))
    return;
  }

  switch (args[0]) {
    case '--EOL':
      const eol = JSON.stringify(EOL);
      console.log(green(eol));
      break;
    case '--cpus':
      console.log(cpus());
      break;
    case '--homedir':
      console.log(green(homedir()));
      break;
    case '--username':
      console.log(green(userInfo().username));
      break;
    case '--architecture':
      console.log(green(arch()));
      break;
    default:
      console.log(red('Invalid input. Unknown argument'))
      break;
  }
}
