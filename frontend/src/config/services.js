import axios from 'axios';

const API_URL = '/api/v1/users';

const services = {
  auth: {
    register: async (user) => {
      const { data } = await axios.post(`${API_URL}/register`, user);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data)); // Store user that comes back from this endpoint in localStorage (also contains JWT which is a must)
      }
    },
    login: async (user) => {
      const { data } = await axios.post(`${API_URL}/login`, user);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
    },
  },
};

export default services;
