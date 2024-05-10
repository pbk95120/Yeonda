import { server } from '@src/app';
import 'dotenv/config';

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
