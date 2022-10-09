import axios from "axios";


const Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

Axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default Axios
