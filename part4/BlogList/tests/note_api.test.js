const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/Blog');

const initialBlogs = [
  {
    title: 'Browser can execute only Javascript',
    author: 'Author',
    url: 'gggggg',
    likes: 7,
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Author',
    url: 'gggggg',
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = initialBlogs.map((blog) => new Blog(blog));
  const blogArray = blogObject.map((blog) => blog.save());
  await Promise.all(blogArray);
});

describe('test backend', () => {
  it('makes the HTTPS GET request', async () => {
    const response = await api.get('/api/blogs').expect(200);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  it('sucessfully creates a new blog', async () => {
    const newBlog = {
      title: 'tEST',
      author: 'Author',
      url: 'gggggg',
      likes: 7,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    console.log(response.body.length);
    expect(response.body.length).toBe(initialBlogs.length + 1);
  });

  it('check if the like property is missing', async () => {
    const newBlog = {
      title: 'tEST',
      author: 'Author',
      url: 'gggggg',
    };

    await api.post('/api/blogs').send(newBlog).expect(200);

    const response = await api.get('/api/blogs');
    const blog = response.body[2];
    expect(blog.likes).toBe(0);
  });

  it('verifies that title and url are missing grom request ', async () => {
    const newBlog = {
      author: 'Author',
    };

    await api.post('/api/blogs').send(newBlog).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
