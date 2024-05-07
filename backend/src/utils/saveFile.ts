import fs from 'fs';

export const saveFile = (path: string, buffer: Buffer) => {
  try {
    fs.writeFileSync(path, buffer);
  } catch (error) {
    throw error;
  }
};
