import makeApp from './app';
import { config, app as serverExpress } from './server';

const app = makeApp({
  config,
  server: serverExpress,
})();

export default app;
