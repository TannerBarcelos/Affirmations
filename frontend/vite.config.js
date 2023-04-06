import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ( { mode } ) => {
  process.env = { ...process.env, ...loadEnv( mode, process.cwd() ) }
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/backend': {
          target: process.env.VITE_BACKEND_URL,
        }
      }
    }
  }
}