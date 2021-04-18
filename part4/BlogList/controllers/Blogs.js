const BlogRouter = require('express').Router();
const Blog = require('../models/Blog');
const { error } = require('../utils/logger');

BlogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

BlogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body);

  if (request.body.name === undefined) {
    response.status(404).json({ error: 'content missing' }).end();
  }

  blog
    .save()
    .then((result) => {
      response.json(result);
      response.status(201).end();
    })
    .catch((error) => next(error));
});
module.exports = BlogRouter;
