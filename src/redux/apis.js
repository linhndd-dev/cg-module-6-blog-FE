import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
        let posts = await axios.get(`${baseURL}`,
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        return posts.data.posts
    }
)

export const createMyPost = createAsyncThunk(
    'case6/creatPost',
    async (prop) => {
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

export const editPost = createAsyncThunk(
    'case6/editPost',
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

export const getDetailPost = createAsyncThunk(
    'case6/getDetailPost',
    async (prop) => {
        let post = await axios.get(
            `${baseURL}/${prop}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        return post.data.post[0];
    }
)

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    listPosts: builder.query({
      query: (page = 1) => `posts/?page=${page}`,
    }),
  }),
})

export const { useListPostsQuery } = api