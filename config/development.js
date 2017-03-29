module.exports = {
  server: {
    cors: ['http://localhost:4000', 'http://127.0.0.1:4000'],
  },
  mongodb: {
    database: 'mongodb://127.0.0.1:27017/proto-skeleton'
  },
  security: {
    secret: 'SecretSecretySecret'
  }
};
