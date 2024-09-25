require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./logger/logger');

const courseRouter = require('./routes/courses');

const app = express();

app.use((req, res, next) => {
  const { method, url } = req;
  const startTime = Date.now();

  // Log details after the response is sent
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    const logMessage = `${method} ${url} - ${res.statusCode} - ${responseTime}ms`;

    // Differentiate logs based on response status code
    if (res.statusCode >= 400 && res.statusCode < 500) {
      logger.warn(logMessage);  // Warn for client errors (4xx)
    } else if (res.statusCode >= 500) {
      logger.error(logMessage);  // Error for server errors (5xx)
    } else {
      logger.info(logMessage);  // Info for successful requests
    }
  });

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', courseRouter);

module.exports = app
