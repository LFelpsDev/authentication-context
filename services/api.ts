import axios from 'axios';
import {parseCookies} from 'nookies';

const cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333/', // é preciso estar rodando a aplicação do auth backend feita em node.
  headers: {  
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
})