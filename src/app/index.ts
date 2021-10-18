import http from 'http';
import net from 'net';

import { Config } from '../config/index';

interface ServerOptions {
  host: string;
  port: number;
}

interface Application {
  config: Config;
  options?: ServerOptions;
  server: http.Server;
}

const application =
  ({ config, server, options }: Application) =>
  async (): Promise<http.Server> => {
    return new Promise(resolve => {
      const hostname = (options && options.host) || config.web.host;
      const port = (options && options.port) || Number(config.web.port);

      const serverExpress = server.listen(port, hostname, () => {
        const address = serverExpress.address() as net.AddressInfo;

        // eslint-disable-next-line no-console
        console.log(`🎉 App is running on port ${address.port}`);

        resolve(serverExpress);
      });
    });
  };

export default application;
