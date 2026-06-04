import axios from 'axios'

const baseURL = window.location.hostname === 'localhost'
  ? ''
  : 'https://nat-massage-production.up.railway.app'

const api = axios.create({ baseURL })
console.log('BASE URL =', baseURL)
export default api
