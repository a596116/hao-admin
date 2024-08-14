import Axios from './Axios'

export const http = new Axios({
  baseURL: `${env.VITE_BASEURL}`,
  timeout: 5000,
})
