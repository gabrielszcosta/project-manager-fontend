import Axios from 'axios';

const api = Axios.create({
  baseURL: 'https://project-manager-api.herokuapp.com/',
});

export default api;
