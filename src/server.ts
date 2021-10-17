import makeConfig, { EnvironmentConfig } from './config';
import makeHttpServer from './interfaces/http';
import makeHttpRoutes from './interfaces/http/routes';

const env = (process.env.NODE_ENV || 'development') as keyof EnvironmentConfig;
const config = makeConfig(env);
const httpServer = makeHttpServer();

const httpRoutes = makeHttpRoutes();
const httpApplication = httpServer.makeHttpApplication({
  routes: httpRoutes,
});
const app = httpApplication.start();

export { app, config };
