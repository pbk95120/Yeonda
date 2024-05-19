import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { renameImage } from '@utils/renameImage';
import 'dotenv/config';

const { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, FILE_BASE_USER } = process.env;

export const requestS3Save = async (file: Express.Multer.File) => {
  const client = new S3Client({
    region: REGION,
    credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY },
  });

  const extension = file.originalname.split('.').pop();
  const key = renameImage(file);

  const params = {
    Bucket: 'yeonda',
    Key: key,
    Body: file.buffer,
    ContentType: `image/${extension}`,
  };

  try {
    const command = new PutObjectCommand(params);
    await client.send(command);
    return `${FILE_BASE_USER}${key}`;
  } catch (error) {
    throw error;
  }
};
