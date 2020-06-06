import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObject) => {
  const configuration = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, blogObject, configuration)
  return response.data
}

const deleteBlog = async (blogObject) => {
  const configuration = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${blogObject.blogId}`, configuration)
  return response.data
}

const updateLikes = async (blogObject) => {
  const response = await axios.put(`${baseUrl}/${blogObject.blogId}`, blogObject)
  return response.data
}

export default { getAll, setToken, create, updateLikes, deleteBlog }