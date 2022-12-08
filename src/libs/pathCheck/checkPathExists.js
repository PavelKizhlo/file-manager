import { stat } from 'fs/promises';

export async function checkPathExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}
