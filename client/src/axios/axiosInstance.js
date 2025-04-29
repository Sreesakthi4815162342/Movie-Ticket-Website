import axios from "axios"

const url=import.meta.env.VITE_BASE_URL


 export const axiosInstance=axios.create({
    baseURL:url,
    withCredentials:true,
})

axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token")
    request.headers.Authorization = `Bearer ${token}`
    return request;
})