import axios from 'axios'
import JWT from './JWT';

export default axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 61000,
    headers: JWT.authHeader()
  });