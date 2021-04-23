import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credintentials) => {
  const response = await axios.post(baseUrl, credintentials);
  return response.data;
};

export default { login };
