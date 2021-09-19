module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "sGZcmQLVmN",
    password: process.env.MYSQL_PASS || "YcLBUunUva",
    database: process.env.MYSQL_DB || "sGZcmQLVmN",
  },
  mysqlService: {
    host: process.env.MYSQL_SERVICE_HOST || "localhost",
    port: process.env.MYSQL_SERVICE_PORT || 3001,
  },
};
