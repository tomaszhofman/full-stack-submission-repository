const BlogRouter = require('express').Router();
const Blog = require('../models/Blog');
const { error } = require('../utils/logger');

BlogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

BlogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(404).json({ error: 'content missing' }).end();
  }

  try {
    const result = await blog.save();
    response.json(result);
    response.status(201).end();
  } catch (error) {
    next(error);
  }
});
module.exports = BlogRouter;
