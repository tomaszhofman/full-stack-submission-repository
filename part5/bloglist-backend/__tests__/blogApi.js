const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('../utils/testHelper');
const bcrypt = require('bcrypt');
const User = require('../models/user');
let token = null;
beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('password', 10);
  const user = new User({ username: 'jane', passwordHash });

  await user.save();

  // Login user to get token
  await api
    .post('/api/login')
    .send({ username: 'jane', password: 'password' })
    .then((res) => {
      return (token = res.body.token);
    });

  return token;
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await helper.blogsInDb();

  expect(response[2].likes).toBe(0);
});

describe('delete a blogs', () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();

    await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .then((res) => {
        return (token = res.body.token);
      });

    const newBlog = {
      title: 'Another blog',
      author: 'Jane Doe',
      url: 'http://dummyurl.com',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    return token;
  });

  test('verifies if specify blog is being deleted', async () => {
    const blogsAtStart = await Blog.find({}).populate('user');
    const blogAtStart = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogAtStart.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);
  });

  test(' adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogAtStart = blogsAtStart[0];
    const response = await api
      .delete(`/api/blogs/${blogAtStart.id}`)
      .expect(400);

    expect(response.error.text).toContain('"error":"invalid token"');
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
