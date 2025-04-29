import {axiosInstance} from "../axios/axiosInstance";

export const userLogin=(data)=>{
    return axiosInstance.post('/user/login',data)
}

export const userSignup=(data)=>{
    return axiosInstance.post("/user/signup",data)
}

export const userLogout=()=>{
    return axiosInstance.post("/user/logout")
}

export const getTotalUsers=()=>{
    return axiosInstance.get("/user/totalUsers")
}

export const getUsers=()=>{
    return axiosInstance.get("/user/getUsers")
}

export const deleteUser=(id)=>{
    return axiosInstance.delete(`/user/deleteUser/${id}`)
}

export const Updateprofile=(data)=>{
    return axiosInstance.patch("/user/updateProfile",data)
}