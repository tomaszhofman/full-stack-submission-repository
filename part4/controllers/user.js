const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');

  response.send(users);
});

usersRouter.post('/', async (request, response, next) => {
  const body = request.body;
  try {
    if (!body.password || body.password.length < 3) {
      return response
        .status(400)
        .json({ error: 'password must be at least 3 characters long' });
    }
    const saltRounds = 10;
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
