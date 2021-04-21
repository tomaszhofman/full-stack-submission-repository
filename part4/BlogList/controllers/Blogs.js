const BlogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

BlogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

BlogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
  response.status(200);
});

BlogRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    response.status(404).json({ error: 'content missing' }).end();
  }
  try {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!(token || decodedToken.id)) {
      return response.status(401).json({ error: 'token missing' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    response.json(savedBlog);
    response.status(201).end();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
  } catch (error) {
    next(error);
  }
});

BlogRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!(token && decodedToken)) {
      return response.status(401).json({ error: 'invalid token' });
    }

    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === decodedToken.id.toString()) {
      await blog.remove();
      response.status(204).end();
    } else {
      response.status(404).end();
    }

    console.log(blog);
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
