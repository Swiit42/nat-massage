import axios from 'axios'

const baseURL = window.location.hostname === 'localhost'
  ? ''
  : 'https://nat-massage-production.up.railway.app'

const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  console.log('REQUEST =>', `${config.baseURL}${config.url}`)
  return config
})

export default api