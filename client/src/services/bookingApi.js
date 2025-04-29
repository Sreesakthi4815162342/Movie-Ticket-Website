import {axiosInstance} from "../axios/axiosInstance";

export const createBooking=(data)=>{
    console.log(data);
    return axiosInstance.post('/booking/createBooking',data)
}

export const getBooking=()=>{
    return axiosInstance.get('/booking/getBooking')
}

export const getBookings=(id)=>{
    return axiosInstance.get(`/booking/getBookings/${id}`)
}