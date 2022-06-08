import axios from 'axios';

const API_URL = '/api/v1';
const usersAPI = '/users';
const affirmationsAPI = '/affirmations';

const services = {
  auth: {
    register: async (user) => {
      const { data } = await axios.post(`${API_URL}${usersAPI}/register`, user);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    },
    login: async (user) => {
      const { data } = await axios.post(`${API_URL}${usersAPI}/login`, user);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    },
    logout: () => {
      localStorage.removeItem('user');
    },
  },
  affirmations: {
    create: async (affirmation, token) => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${API_URL}${affirmationsAPI}/create`,
        affirmation,
        options,
      );
      return data;
    },
    delete: async (id, token) => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${API_URL}${affirmationsAPI}/delete/${id}`,
        options,
      );
      return data;
    },
    getAll: async (token) => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${API_URL}${affirmationsAPI}/getAll`,
        options,
      );
      return data;
    },
  },
};

export default services;
