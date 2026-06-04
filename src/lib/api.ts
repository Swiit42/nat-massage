import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? ''
    : 'https://nat-massage-production.up.railway.app',
})

export default api
