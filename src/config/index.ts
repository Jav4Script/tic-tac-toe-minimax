import makeConfig from './config';

export interface Config {
  env: string;
  web: {
    host: string;
    port: string;
  };
}

export interface EnvironmentConfig {
  development: Config;
  test: Config;
}

const config = (environment: keyof EnvironmentConfig): Config =>
  (makeConfig as EnvironmentConfig)[environment];

export default config;
