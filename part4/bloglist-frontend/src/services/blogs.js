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

export default { getAll, create, getToken };
