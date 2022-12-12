import { changeDir } from './changedir.js';

export async function goUpDir(pwd) {
  const newPath = await changeDir(pwd, ['../']);
  return newPath;
}
