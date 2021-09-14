const loginRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });

  const correctPassword =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && correctPassword)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = { username: user.username, id: user._id };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
