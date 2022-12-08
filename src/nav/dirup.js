import { parse, join } from 'path';

export function goUpDir(pwd) {
  const parsedPath = parse(pwd);
  const root = parsedPath.root;
  const dir = parsedPath.dir;

  if (pwd === root) {
    return pwd;
  }

  return join(root, dir);
}
