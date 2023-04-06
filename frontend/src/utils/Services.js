import axios from 'axios'

const proxyPrefix = "/api"
const userRoutes = "/users"
const affirmationRoutes = "/affirmations"

const endpoints = {
  auth: {
    register: `${proxyPrefix}${userRoutes}/register`,
    login: `${proxyPrefix}${userRoutes}/login`,
  },
  affirmations: {
    create: `${proxyPrefix}${affirmationRoutes}/create`,
    delete: `${proxyPrefix}${affirmationRoutes}/delete`,
    getAll: `${proxyPrefix}${affirmationRoutes}/getAll`,
    update: `${proxyPrefix}${affirmationRoutes}/edit`,
  },
}

export const Services = {
  auth: {
    register: async ( user ) => {
      const { data } = await axios.post( endpoints.auth.register, user )
      if ( data ) {
        localStorage.setItem( 'user', JSON.stringify( data ) )
      }
      return data
    },
    login: async ( user ) => {
      const { data } = await axios.post( endpoints.auth.login, user )
      if ( data ) {
        localStorage.setItem( 'user', JSON.stringify( data ) )
      }
      return data
    },
    logout: () => {
      localStorage.removeItem( 'user' )
    },
  },
  affirmations: {
    create: async ( affirmation, token ) => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.post(
        endpoints.affirmations.create,
        affirmation,
        options,
      )
      return data
    },
    delete: async ( id, token ) => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.delete(
        endpoints.affirmations.delete + `/${id}`,
        options,
      )
      return data
    },
    getAll: async ( token ) => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.get(
        endpoints.affirmations.getAll,
        options,
      )
      return data
    },
    update: async ( id, affirmation, token ) => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.put(
        endpoints.affirmations.update + `/${id}`,
        affirmation,
        options,
      )
      return data
    },
  },
}
