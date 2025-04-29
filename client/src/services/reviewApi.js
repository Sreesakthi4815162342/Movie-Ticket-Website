import {axiosInstance} from "../axios/axiosInstance";


export const getReviews=(id)=>{
    return axiosInstance.get(`/review/getReviews/${id}`)
}

export const createReviews = (movieId, data) => {
    const token = localStorage.getItem("token");
  
    return axiosInstance.post(
      `review/createReview/${movieId}`, // Adjust the URL if different
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  };