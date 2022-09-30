import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";

const baseURL = "http://localhost:5000/posts";
let user = JSON.parse(localStorage.getItem('login'));
let token;
if(user){
    token = user.accessToken;
}else{
    alert("Deo co quyen")
}
export const getAllMyPost = createAsyncThunk(
    'case6/getAll',
    async () => {
        let posts = await axios.get(`${baseURL}`,{headers:{"Authorization": `Bearer ${token}`}})
        return posts.data
    }
)

export const createMyPost = createAsyncThunk(
    'case6/creatPost',
    async (prop) => {
        console.log(prop);
        await axios.post(
            `${baseURL}`, 
            prop, 
                {
                    headers:{
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

        return prop
    }
)
