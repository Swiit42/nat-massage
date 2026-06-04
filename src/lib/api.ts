import axios from 'axios'

const baseURL = window.location.hostname === 'localhost'
  ? ''
  : 'https://nat-massage-production.up.railway.app'

const api = axios.create({ baseURL })

export default api
