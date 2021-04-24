const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const saltRounds = 10;
  try {
    if (body.password === undefined || body.password.length < 3) {
      return response
        .status(400)
        .json({ error: 'password is too short or missing' })
        .end();
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;