const dummy = (blogs) => {
  if (blogs) {
    return 1;
  } else {
    return 0;
  }
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
