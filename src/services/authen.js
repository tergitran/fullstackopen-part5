import axios from 'axios'
let baseUrl = '/api/login'

const login = async (data) => {
  const res = await axios.post(baseUrl, data);
  return res.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login
}