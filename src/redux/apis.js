import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Swal from "sweetalert2";


const baseURL = "http://localhost:5000/posts";
export const getAllMyPost = createAsyncThunk(
    'post/getAll',
    async () => {
        let {data} = await axios.get(`${baseURL}`,
        )
        return data;
    }
)

export const getPostsByGuest = createAsyncThunk(
    'post/getPostsByGuest',
    async () => {
        const {data} = await axios.get(`${baseURL}/guest`)
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
        )

        return prop;
    }
)

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId, ThunkAPI) => {
        await axios.delete(
            `${baseURL}/${postId}`,
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
