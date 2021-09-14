const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('../utils/testHelper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('when there is initialy one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany();

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
  });

  test('creation succeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'test',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe('check if user is not created', () => {
  test('creation failed with no password', async () => {
    const usersAtStart = await helper.blogsInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    };

    await api.post('/api/users').send(newUser).expect(400);

    expect(usersAtStart).toHaveLength(usersAtStart.length);
  });

  test('creation failed with password shorter than 3', async () => {
    const usersAtStart = await helper.blogsInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: '12',
    };

    await api.post('/api/users').send(newUser).expect(400);

    expect(usersAtStart).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.blogsInDb();

    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'test12',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);

    expect(response.body.error).toContain('`username` to be unique');

    expect(usersAtStart).toHaveLength(usersAtStart.length);
  });
});
