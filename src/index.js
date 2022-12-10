import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { homedir } from 'os';
import { green, yellow } from './libs/color/color.js';
import { commandController } from './controller.js';


function startFileManager () {
  const pwd = homedir();
  const args = process.argv.slice(2);
  const userNameArg = args.find(arg => arg.match(/^--username/));

  const userName = userNameArg ?
      userNameArg.replace('--username=', '').trim() :
      'Anonymous';

  const rl = createInterface({
    input: stdin,
    output: stdout
  });

  console.log(green(`Welcome to the File Manager, ${userName}!`))
  console.log(yellow(`You are currently in ${pwd}`))

  rl.on('line', commandController(pwd));

  rl.on('close', () => {
    console.log(green(`Thank you for using File Manager, ${userName}, goodbye!`))
  })
}

startFileManager();
