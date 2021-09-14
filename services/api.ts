import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/' // é preciso estar rodando a aplicação do auth backend feita em node.
})