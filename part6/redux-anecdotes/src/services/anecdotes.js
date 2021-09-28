import axios from 'axios';
import { asObject } from '../reducers/anecdoteReducer';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createNew = async (object) => {
  const content = asObject(object);
  const response = await axios.post(baseUrl, content);

  console.log(response);

  return response.data;
};

const incrementLikes = async (id) => {
  const old = await getOne(id);
  console.log(old);
  old.votes = old.votes + 1;
  console.log(old);
  const response = await axios.put(`${baseUrl}/${id}`, old);
  return response.data;
};

export default { getAll, createNew, getOne, incrementLikes };
