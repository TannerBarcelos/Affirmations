import axios from 'axios';

const API_URL = '/api/v1/users';

const services = {
  auth: {
    register: async (user) => {
      const { data } = await axios.post(`${API_URL}/register`, user);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data)); // If data comes back, this means we have success and got the JWT from the register route in our API. set the token in localStorage as 'user' (see access in authSlice)
      }
    },
  },
};

export default services;
