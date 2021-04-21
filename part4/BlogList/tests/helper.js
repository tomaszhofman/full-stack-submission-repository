const User = require('../models/User');

const getAllUsers = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  getAllUsers,
};
