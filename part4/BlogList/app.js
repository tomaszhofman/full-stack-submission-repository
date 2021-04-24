const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const BlogRouter = require('./controllers/Blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/Users');
const loginRouter = require('./controllers/login');

logger.info('connecting to ', config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MONGoDB');
  });

app.use(middleware.tokenExtractor);

app.use(cors());
// app.use(express.static('build'))
app.use(express.json());

app.use('/api/blogs', BlogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;