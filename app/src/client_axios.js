import axios from 'axios'
import JWT from './JWT';

export default axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 61000,
    headers: JWT.authHeader()
  });