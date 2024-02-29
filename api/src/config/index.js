const config = {
  dbUrl: process.env.DATABASE_URL || "mongodb://localhost/test-db",
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || "development",
  logDir: process.env.LOGDIR || "logs",
  viewEngine: process.env.VIEW_ENGINE || "html",
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_CACHE_TIMEOUT: process.env.REDIS_CACHE_TIMEOUT
};

module.exports = config;