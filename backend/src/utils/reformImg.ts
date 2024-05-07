import 'dotenv/config';
import { v4 } from 'uuid';

export const reformImg = (file: Express.Multer.File): string => {
  const destination = process.env.MULTER_PROFILE;
  const unique = v4();
  const extension = file.originalname.split('.').pop();
  return `${destination}${unique}.${extension}`;
};
