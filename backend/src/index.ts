import 'tsconfig-paths/register';
import { io, server } from '@src/app';
import 'dotenv/config';

const { PORT } = process.env;
const { SOCKET_PORT } = process.env;

io.listen(parseInt(SOCKET_PORT));

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
