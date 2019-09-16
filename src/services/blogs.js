import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async newBlog => {
  console.log(newBlog)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + '/'+blog.id
  const response = await axios.put(url, blog, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url,config)
  return response.status
}

const setToken = newToken => {
  console.log('Token is ready')
  token = `bearer ${newToken}`
}

export default { getAll, create, like,remove, setToken }
