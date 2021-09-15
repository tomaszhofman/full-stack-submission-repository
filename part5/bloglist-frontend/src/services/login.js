import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credentals) => {
  const response = await axios.post(baseUrl, credentals);
  return response.data;
};

export default { login };
