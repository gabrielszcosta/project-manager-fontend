import Axios from 'axios';
import store from '~/store';

const api = Axios.create({
  baseURL: 'https://project-manager-api.herokuapp.com/',
});

api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  const { active: team } = store.getState().teams;

  const headers = { ...config.headers };

  if (token) headers.Authorization = `Bearer ${token}`;

  if (team) headers.TEAM = team.slug;

  return { ...config, headers };
});

export default api;
