import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";

const baseURL = "http://localhost:5000/post";
let user = JSON.parse(localStorage.getItem('login'));
let token;
if(user){
    token = user.accessToken;
}else{
    alert("Deo co quyen")
}
export const getAllPostByUser = createAsyncThunk(
    'case6/getAll',
    async (id) => {
        let posts = await axios.get(`${baseURL}/${id}`,{headers:{"Authorization": `Bearer ${token}`}})
        return posts.data
    }
)

export const createPostByUser = createAsyncThunk(
    'case6/creatPost',
    async (id, value) => {
        console.log(value);
        await axios.post(
            `${baseURL}/${id}`, 
            value, 
            {
                headers:{
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            )
        return value 
    }
)
