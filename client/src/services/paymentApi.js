import {axiosInstance} from "../axios/axiosInstance";


export const makePayment=(data)=>{
    return axiosInstance.post("payment/stripe-checkout",data)
}