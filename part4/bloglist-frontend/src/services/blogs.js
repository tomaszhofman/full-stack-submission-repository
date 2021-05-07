import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getToken = (newtoken) => {
  token = `bearer ${newtoken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newContent) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  const response = await axios.post(baseUrl, newContent, config);

  return response.data;
};

const update = async (id, updatedContent) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedContent);
  return response.data;
};

const updateComments = async (id, updatedContet) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    comments: updatedContet,
  });
  return response.data;
};

const deleteItem = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const incrementLikes = async (id) => {
  const blog = await getOne(id);
  const likes = blog.likes + 1;
  const newBlog = { ...blog, likes };

  const response = await update(id, newBlog);
  console.log(response);
  return response;
};

export default {
  getAll,
  create,
  getToken,
  update,
  deleteItem,
  incrementLikes,
  getOne,
  updateComments,
};
