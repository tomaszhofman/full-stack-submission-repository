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
    title: 'Love dogs',
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
      title: 'Smolensk historia',
      author: 'Author',
      url: 'gggggg',
    };

    await api.post('/api/blogs').send(newBlog).expect(200);

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
    it('succeeds with status 204 if id is correct', async () => {
      const notesAtStart = await api.get('/api/blogs');
      const noteToDelete = notesAtStart.body[0];

      await api.delete(`/api/blogs/${noteToDelete.id}`).expect(204);
      const notesAtEnd = await api.get('/api/blogs');

      expect(notesAtEnd.body).toHaveLength(initialBlogs.length - 1);
      const content = notesAtEnd.body.map((r) => r.title);
      expect(content).not.toContain(noteToDelete.title);
      console.log(content);
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

afterAll(() => {
  mongoose.connection.close();
});
