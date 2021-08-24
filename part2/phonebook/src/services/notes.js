import axios from 'axios';

const BASE_URL = 'http://localhost:3002/persons';

export const getAll = () => {
  return axios.get(BASE_URL).then((response) => response.data);
};

export const create = (newObject) => {
  return axios.post(BASE_URL, newObject).then((response) => response.data);
};

export const deleteObject = (id) => {
  return axios.delete(`${BASE_URL}/${id}`).then((response) => response.data);
};

export const update = (id, newObject) => {
  return axios
    .put(`${BASE_URL}/${id}`, newObject)
    .then((response) => response.data);
};
