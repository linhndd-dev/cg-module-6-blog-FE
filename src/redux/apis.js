import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Swal from "sweetalert2";


const baseURL = "http://localhost:5000/posts";
let user = JSON.parse(localStorage.getItem('login'));
let token;
if(user){
    token = user.accessToken;
}
export const getAllMyPost = createAsyncThunk(
    'post/getAll',
    async (page) => {
        let {data} = await axios.get(`${baseURL}?page=${page}`,
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        return data;
    }
)

export const getPostsByGuest = createAsyncThunk(
    'post/getPostsByGuest',
    async (page) => {
        const {data} = await axios.get(`${baseURL}/guest?page=${page}`)
        return data;
    }
    
)

export const searchMyPosts = createAsyncThunk(
    "post/searchMyPosts",
    async (searchQuery, { rejectWithValue }) => {
      try {
        const {data} = await axios.get(`${baseURL}/search?searchQuery=${searchQuery}`)
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


export const createMyPost = createAsyncThunk(
    'post/createPost',
    async ({value,navigate}) => {
        try {
            await axios.post(
                `${baseURL}`, 
                value, 
                    {
                        headers:{
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                )
                Swal.fire({
                    icon: 'success',
                    title: 'Create new post successful!',
                  })
                  navigate('/post/list')
            return value
        } catch (error) {
            
        }
        
    }
)

export const editPost = createAsyncThunk(
    'post/editPost',
    async (prop) => {
        await axios.put(
            `${baseURL}/${prop.id}`,
            prop.values,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        )

        return prop;
    }
)

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId, ThunkAPI) => {
        await axios.delete(
            `${baseURL}/${postId}`,
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        ThunkAPI.dispatch(getAllMyPost())
        return postId;
    }
)

export const getDetailPost = createAsyncThunk(
    'post/getDetailPost',
    async (prop) => {
        let post = await axios.get(
            `${baseURL}/${prop}`
        )
        return post.data.posts[0];
    }
)
