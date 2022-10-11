import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Swal from "sweetalert2";

if ("login" in localStorage) {
  const login = JSON.parse(localStorage.getItem("login"));
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${login.accessToken}`;
}
const baseURL = "http://localhost:5000/posts";
export const getAllMyPost = createAsyncThunk("post/getAll", async () => {
  let { data } = await axios.get(`${baseURL}`);
  return data;
});

export const getPostsByGuest = createAsyncThunk(
  "post/getPostsByGuest",
  async () => {
    const { data } = await axios.get(`${baseURL}/guest`);
    return data;
  }
);

export const searchMyPosts = createAsyncThunk(
  "post/searchMyPosts",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/search?searchQuery=${searchQuery}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createMyPost = createAsyncThunk(
  "post/createPost",
  async ({ value, navigate }) => {
    try {
      const {data} = await axios.post(`${baseURL}`, value);
      Swal.fire({
        icon: "success",
        title: "Create new post successful!",
      }).then((isConfirm) => {
        if (isConfirm) {
          navigate("/post/list");
        }
      });
      return data;
    } catch (error) {}
  }
);

export const editPost = createAsyncThunk("post/editPost", async (prop) => {
  await axios.put(`${baseURL}/${prop.id}`, prop.values);

  return prop;
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, ThunkAPI) => {
    await axios.delete(`${baseURL}/${postId}`);
    // ThunkAPI.dispatch(getAllMyPost());
    return postId;
  }
);

export const getDetailPost = createAsyncThunk(
  "post/getDetailPost",
  async (prop) => {
    let post = await axios.get(`${baseURL}/${prop}`);
    return post.data.posts[0];
  }
);
export const profileUser = createAsyncThunk(
    'auth/profileUser',
    async (id) => {
        let {data} = await axios.get(`http://localhost:5000/auth/profile/${id}`)
        return data
    }
)

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (id,prop) => {
        console.log('sss',prop)
        console.log(id)
        let {data} =  await axios.put(`http://localhost:5000/auth/profile/${id}`, prop)
        return data
    }
)

export const likePost = async (postId) => {
  try {
    const res = await axios.post(`${baseURL}/like/${postId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export const unlikePost = async (postId) => {
  try {
    const res = await axios.delete(`${baseURL}/like/${postId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
