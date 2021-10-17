module.exports = {
  development: {
    web: {
      host: process.env.HOST,
      port: process.env.PORT,
    },
    env: process.env.NODE_ENV,
  },
  test: {
    web: {
      host: process.env.HOST,
      port: process.env.PORT,
    },
    env: process.env.NODE_ENV,
  },
};
