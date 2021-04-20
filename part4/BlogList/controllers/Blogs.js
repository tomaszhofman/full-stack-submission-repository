const BlogRouter = require('express').Router();
const { request, response } = require('express');
const Blog = require('../models/Blog');
const { error } = require('../utils/logger');

BlogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

BlogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
  response.status(200);
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

BlogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

BlogRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  try {
    const updatedBlog = {
      likes: body.likes,
    };

    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
      new: true,
    });
    response.json(blog);
  } catch (error) {
    next(error);
  }
});
module.exports = BlogRouter;
