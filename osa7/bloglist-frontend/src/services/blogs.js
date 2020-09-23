import axios from 'axios'
const baseUrl = '/api/blogs'

let config = null

const setToken = newToken => {
  const token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const comment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { setToken, getAll, create, update, comment, remove }