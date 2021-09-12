const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('../utils/testHelper');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

const api = supertest(app);

test('blogs are retured as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('the first blog is writen by Michael Chan', async () => {
  const response = await api.get('/api/blogs');

  const authors = response.body.map((el) => el.author);

  expect(authors).toContain('Michael Chan');
});

test('is unique identifier property of the blog posts  named id,', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('POST request to the /api/blogs url successfully', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Go To Statement 2',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const resopone = blogsAtEnd.map((el) => el.title);
  expect(resopone).toContain('Go To Statement 2');
});

test('verifies that if the likes property is missing from the request', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Go To Statement 3',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await helper.blogsInDb();

  expect(response[2].likes).toBe(0);
});

describe('delete a blogs', () => {
  test('verifies if specify blog is being deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogAtStart = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogAtStart.id}`).expect(204);
  });
});

describe('update blogs', () => {
  test('verifies if likes is being updated correctly', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogAtStart = blogsAtStart[0];
    await api
      .put(`/api/blogs/${blogAtStart.id}`)
      .send({ likes: 30 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const blogAtEnd = blogsAtEnd[0];

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    expect(blogAtEnd.likes).toBe(30);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
