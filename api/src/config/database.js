
module.exports = {
  dialect: process.env.DB_DIALECT || 'mysql',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'laravel',
  host: process.env.DB_HOST || 'localhost',
  define: {
    timestamp: true,
    underscored: true,
  },
};