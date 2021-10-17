import express, { Router } from 'express';
import http from 'http';

interface Container {
  routes: Router;
}

export interface HttpServer {
  makeHttpApplication(container: Container): HttpApplication;
}

export interface HttpApplication {
  start(): http.Server;
}

const server = (): HttpServer => {
  const app = express();
  app.disable('x-powered-by');

  app.get('/', (_, response) => {
    response.status(200).send();
  });

  return {
    makeHttpApplication: ({ routes }: Container): HttpApplication => ({
      start(): http.Server {
        app.use(routes);

        const httpServer = http.createServer(app);
        return httpServer;
      },
    }),
  };
};

export default server;
