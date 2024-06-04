import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

const { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, FILE_BASE_USER } = process.env;

export const S3Delete = async (url: string) => {
  const client = new S3Client({
    region: REGION,
    credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY },
  });

  const key = url.replace(FILE_BASE_USER, '');

  const params = {
    Bucket: 'yeonda',
    Key: key,
  };

  const command = new DeleteObjectCommand(params);

  try {
    await client.send(command);
    return true;
  } catch (error) {
    throw error;
  }
};
