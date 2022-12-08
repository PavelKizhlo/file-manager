import { stat } from 'fs/promises';

export async function checkIsFile(path) {
  const stats = await stat(path);
  return stats.isFile();
}
