require('dotenv').config();
const logger = require('../logger/logger')

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
} = process.env
module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql",
    "logging": (info) => {
      logger.info(info);
    }
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql",
    "logging": (info) => {
      logger.info(info);
    }
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql",
    "logging": (info) => {
      logger.info(info);
    }
  }
}
