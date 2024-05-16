import multer from 'multer';

const storage = multer.memoryStorage();

export const memoryStorage = multer({ storage: storage });
