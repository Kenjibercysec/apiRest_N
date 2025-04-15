const { Sequelize } = require('sequelize');
const logger = require('./logger');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'REST',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '12345',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = { sequelize }; 