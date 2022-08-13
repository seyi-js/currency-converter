export default () => ({
  mongodb: {
    development: {
      uri:
        process.env.MONGO_URI ||
        'mongodb://admin:admin@localhost:27017/currency?authSource=admin',
    },
    production: {
      uri: process.env.MONGO_URI || '',
    },
  },
});
