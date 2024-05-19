import 'dotenv/config';
import { v4 } from 'uuid';

export const renameImage = (file: Express.Multer.File): string => {
  const unique = v4();
  const extension = file.originalname.split('.').pop();
  return `${unique}.${extension}`;
};
