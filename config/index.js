const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: '127.0.0.1',
      port: '3306',
      user: "root",
      password: "root",
      database: "retail",
      connectTimeout: 60000
    },
    listPerPage: 10,
  };
  module.exports = config;