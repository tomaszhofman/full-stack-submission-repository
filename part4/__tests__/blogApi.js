const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
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

  expect(response.body).toHaveLength(initialBlogs.length);
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

  const blogsAfterRequest = await api.get('/api/blogs');
  expect(blogsAfterRequest.body.length).toBe(initialBlogs.length + 1);
  const resopone = blogsAfterRequest.body.map((el) => el.title);
  expect(resopone).toContain('Go To Statement 2');
});

test(' verifies that if the likes property is missing from the request', async () => {
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

  const response = await api.get('/api/blogs');

  expect(response.body[2].likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
