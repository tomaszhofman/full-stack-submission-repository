const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/Blog');
const User = require('../models/User');
const helper = require('./helper');
const bcrypt = require('bcrypt');

const initialBlogs = [
  {
    title: 'Browser can execute only Javascript',
    author: 'Author',
    url: 'gggggg',
    likes: 7,
  },
  {
    title: 'Love dogs',
    author: 'Author',
    url: 'gggggg',
    likes: 7,
  },
];

let token = null;
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const blogObject = initialBlogs.map((blog) => new Blog(blog));
  const blogArray = blogObject.map((blog) => blog.save());
  await Promise.all(blogArray);

  const passwordHash = await bcrypt.hash('sekret', 10);
  const newUser = new User({ username: 'test', passwordHash });
  await newUser.save();

  const loginUser = await api
    .post('/api/login')
    .send({ username: 'test', password: 'sekret' });

  token = loginUser.body.token;
  return token;
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
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    console.log(response.body.length);
    expect(response.body.length).toBe(initialBlogs.length + 1);
  });

  it('check if the like property is missing', async () => {
    const newBlog = {
      title: 'Smolensk historia',
      author: 'Author',
      url: 'gggggg',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(200);

    const blog = await Blog.find({ title: 'Smolensk historia' });
    // const response = await api.get('/api/blogs');
    // const blog = response.body[2];

    expect(blog[0].likes).toBe(0);
  });

  it('verifies that title and url are missing grom request ', async () => {
    const newBlog = {
      author: 'Author',
    };

    await api.post('/api/blogs').send(newBlog).expect(404);
  });

  describe('deletion of a note', () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('secret', 10);
      const user = new User({ username: 'TEST', passwordHash });
      await user.save();

      const userLogin = await api
        .post('/api/login')
        .send({ username: 'TEST', password: 'secret' });
      token = userLogin.body.token;

      const newBlog = {
        title: 'Another blog',
        author: 'Jane Doe',
        url: 'http://dummyurl.com',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      return token;
    });
    it('succeeds with status 204 if id is correct', async () => {
      const blogsAtStart = await Blog.find({}).populate('user');

      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await Blog.find({}).populate('user');

      expect(blogsAtStart).toHaveLength(1);
      expect(blogsAtEnd).toHaveLength(0);
      console.log(blogsAtEnd);
      const content = blogsAtEnd.map((u) => u.title);
      expect(content).not.toContain('Another blog');
    });
  });
});

describe('updating note', () => {
  test('updeting likes with status ok', async () => {
    const blogs = await api.get('/api/blogs');
    const blogToUpdate = blogs.body[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 20 })
      .expect(200);

    const result = await api.get(`/api/blogs/${blogToUpdate.id}`);

    expect(result.body.likes).toBe(20);
  });
});

describe('creating a user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const newUser = new User({ username: 'test', passwordHash });
    await newUser.save();

    const loginUser = await api
      .post('/api/login')
      .send({ username: 'test', password: 'sekret' });

    token = loginUser.body.token;
    return token;
  });
  it('correctly adds a new user', async () => {
    const usersAtBegining = await helper.getAllUsers();
    console.log('test', usersAtBegining);

    const newUser = {
      username: 'Savilic',
      name: 'Savilic Mutulda',
      password: 'savilden',
    };

    await api
      .post('/api/users')
      .send(newUser)

      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtBegining.length + 1);
    console.log(usersAtEnd);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  it('checks if user is unique ', async () => {
    const usersAtBeginning = await helper.getAllUsers();

    const newUser = {
      username: 'test',
      name: 'Test adams',
      password: 'Test',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);

    expect(result.body.error).toContain('`username` to be unique');
    const usersAtEnd = await helper.getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtBeginning.length);
  });

  it('checks if username contains min 3 letters', async () => {
    const usersAtBeginning = await helper.getAllUsers();

    const newUser = {
      username: 'te',
      name: 'Test adams',
      password: 'Test',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);

    expect(result.body.error).toContain('is shorter than the minimum allowed');
    const usersAtEnd = await helper.getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtBeginning.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
