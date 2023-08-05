import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (data) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const res = await axios.post(baseUrl, data, config);
  return res.data;
}

const updateBlog = async (id, data) => {
  const res = await axios.put(`${baseUrl}/${id}`, data);
  return res.data;
}

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, postBlog, setToken, updateBlog, deleteBlog }