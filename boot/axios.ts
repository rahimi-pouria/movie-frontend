import axios from 'axios'

// @ts-ignore

const http = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 0,
    withCredentials: true,
})

export { http }