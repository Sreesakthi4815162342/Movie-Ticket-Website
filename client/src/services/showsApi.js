import {axiosInstance} from "../axios/axiosInstance";


export const getShow=(id)=>{
    return axiosInstance.get(`/showtime/getShow/${id}`)
}

export const getShowsByMovieAndDate=(id, date)=>{
    return axiosInstance.get(`/showtime/getShowsByMovieAndDate/${id}`,{
        params:{date}
    })
}

export const getShowsbyTheaterAndDate=(id, date)=>{
    return axiosInstance.get(`/showtime/getShowsbyTheaterandDate/${id}`,{
        params:{date}
    })
}

export const getShowsDates=(id)=>{
    return axiosInstance.get(`/showtime/getShowsDates/${id}`)
}

export const getShowsDatesByMovie=(id)=>{
    return axiosInstance.get(`/showtime/getShowsDatesByMovie/${id}`)
}

export const getShowbyTheater=(id)=>{
    return axiosInstance.get(`/showtime/getShowbyTheater/${id}`)
}

export const createShow=(data,movieId,theaterId)=>{
    return axiosInstance.post(`/showtime/createShow?movieId=${movieId}&theaterId=${theaterId}`,data)
}

export const deleteShow=(id)=>{
    return axiosInstance.delete(`showtime/deleteShow/${id}`)
}

export const updateShow=(id,data)=>{
    return axiosInstance.patch(`showtime/updateShow/${id}`,data)
}