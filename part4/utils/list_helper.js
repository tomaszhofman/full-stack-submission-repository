const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (listOfBlogs) => {
  return listOfBlogs.reduce((acc, el) => acc + el.likes, 0);
};

const favoriteBlog = (listOfBlogs) => {
  return listOfBlogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

const authors = (blog) => blog.author;

const mostBlogs = (listOfBlogs) => {
  const groupedBlogs = _.groupBy(listOfBlogs, authors);
  const blogsByAuthors = _.mapValues(groupedBlogs, (e) => e.length);
  const mostBlogs = Object.entries(blogsByAuthors).reduce((acc, el) =>
    el[1] > acc[1] ? el : acc
  );
  return {
    author: mostBlogs[0],
    blogs: mostBlogs[1],
  };
};

const mostLikes = (listOfBlogs) => {
  const groupedBlogs = _.groupBy(listOfBlogs, authors);
  const blogsByLikes = _.mapValues(groupedBlogs, totalLikes);
  const mostLikes = Object.entries(blogsByLikes).reduce((acc, el) =>
    el[1] > acc[1] ? el : acc
  );
  return {
    author: mostLikes[0],
    likes: mostLikes[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
