import React from 'react';
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
    {console.log(blog)}
  </div>
);

export default Blog;
