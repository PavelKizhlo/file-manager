import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { homedir } from 'os';
import * as color from './libs/color/color.js'

function startFileManager () {
  const args = process.argv.slice(2);
  const userNameArg = args.find(arg => arg.match(/^--username/));

  const userName = userNameArg ?
      userNameArg.replace('--username=', '').trim() :
      'Anonymous';

  let pwd = homedir();

  const rl = readline.createInterface({input, output});

  console.log(color.green(`Welcome to the File Manager, ${userName}!`))
  console.log(color.yellow(`You are currently in ${pwd}`))

  rl.on('close', () => {
    console.log(color.green(`Thank you for using File Manager, ${userName}, goodbye!`))
  })
}

startFileManager();
