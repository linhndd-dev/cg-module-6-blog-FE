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
export const getAllPost = createAsyncThunk(
    'case6/getAll',
    async (id) => {
        let posts = await axios.get(`${baseURL}/${id}`,{headers:{"Authorization": `Bearer ${token}`}})
        return posts.data
    }
)
