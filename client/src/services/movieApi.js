import {axiosInstance} from "../axios/axiosInstance";

export const getMovies=(genre)=>{
    return axiosInstance.get("/movie/getMovies",{
        params:{genre}
    })
}

export const getMovie=(id)=>{
    return axiosInstance.get(`/movie/getMovie/${id}`)
}

export const getTotalMovies=()=>{
    return axiosInstance.get('/movie/totalMovies')
}

export const deleteMovie=(id)=>{
    return axiosInstance.delete(`/movie/deleteMovie/${id}`)
}

export const updateMovie=(id,formData)=>{
    return axiosInstance.patch(`/movie/updateMovie/${id}`,formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
     })
}

export const createMovie=(formData)=>{
    return axiosInstance.post('/movie/createMovie',formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export const getRecommendedMovies=()=>{
    return axiosInstance.get('/movie/getrecommendMovies')
}