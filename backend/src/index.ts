import { io, server } from '@src/app';
import 'dotenv/config';

const { PORT, SOCKET_PORT } = process.env;

io.listen(parseInt(SOCKET_PORT));

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
