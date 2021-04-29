import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`http://localhost:3001/anecdotes/${id}`);
  return response.data;
};

const incrementLikes = async (id) => {
  const old = await getOne(id);
  old.votes = old.votes + 1;
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${id}`,
    old
  );
  return response.data;
};
export default { getAll, createNew, incrementLikes };
