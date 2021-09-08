const config = require('./utils/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware.js');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(() => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
// app.use(express.static('build'))
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
