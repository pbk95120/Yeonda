import fs from 'fs';
import logger from '../logger';

export const saveFile = (path: string, buffer: Buffer) => {
  try {
    fs.writeFileSync(path, buffer);
  } catch (error) {
    logger.error('파일 저장 오류', error);
    return error;
  }
};
