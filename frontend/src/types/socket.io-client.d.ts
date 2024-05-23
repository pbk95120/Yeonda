declare module 'socket.io-client' {
  import { ManagerOptions, Socket, SocketOptions } from 'socket.io-client/build/index';
  export * from 'socket.io-client/build/index';
  export default function io(
    uri: string,
    opts?: Partial<ManagerOptions & SocketOptions>
  ): Socket;
}
