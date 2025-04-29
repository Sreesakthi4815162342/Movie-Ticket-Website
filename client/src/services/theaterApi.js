import {axiosInstance} from "../axios/axiosInstance";

export const getTheaters=()=>{
    return axiosInstance.get("/theater/getTheaters")
}

export const getTheater=(id)=>{
    return axiosInstance.get(`/theater/getTheater/${id}`)
}

export const deleteTheater=(id)=>{
    return axiosInstance.delete(`/theater/deleteTheater/${id}`)
}

export const createTheater=(formData)=>{
        return axiosInstance.post("/theater/createTheater", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
}

export const getTotalTheaters=()=>{
    return axiosInstance.get("/theater/totalTheaters")
}

export const updateTheater=(formData,id)=>{
 return axiosInstance.patch(`/theater/updateTheater/${id}`,formData,{
    headers:{
        "Content-Type": "multipart/form-data"
    }
 })
}