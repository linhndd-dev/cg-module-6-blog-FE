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
export const getRelatedPosts = createAsyncThunk(
  "post/getRelatedPosts",
  async () => {
    const { data } = await axios.get(`${baseURL}/guest/relatedPosts`);
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
      const { data } = await axios.post(`${baseURL}`, value);
      Swal.fire({
        icon: "success",
        title: "Create new post successful!",
      }).then((isConfirm) => {
        if (isConfirm) {
          navigate("/user/post/list");
        }
      });
      return data;
    } catch (error) {}
  }
);

export const editPost = createAsyncThunk("post/editPost", async (prop) => {
  try {
    await axios.put(`${baseURL}/${prop.id}`, prop.values);
    Swal.fire({
      icon: "success",
      title: "Edit post successful!",
    }).then((isConfirm) => {
      if (isConfirm) {
        prop.navigate("/user/post/list");
      }
    });
  return prop;
  } catch (error) {
    
  }
  
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    try {
      await axios.delete(`${baseURL}/${postId}`);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      return postId;
    } catch (error) {
      
    }
    
  }
);

export const getDetailPost = createAsyncThunk(
  "post/getDetailPost",
  async (prop) => {
    try {
      let post = await axios.get(`${baseURL}/${prop}`);
      return post.data.posts[0];
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
    
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
    async (prop) => {
        console.log(prop)
        console.log('sss',prop.userId)
        console.log(prop.value)
        let {data} =  await axios.put(`http://localhost:5000/auth/profile/${prop.userId}`, prop.value)
        return data
    }
)
export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async (prop) => {
        let {data} = await axios.put(`http://localhost:5000/auth/changepassword/${prop.userId}`, prop.value)
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
};
export const unlikePost = async (postId) => {
  try {
    const res = await axios.delete(`${baseURL}/like/${postId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getComments = createAsyncThunk("post/getComments", async (id) => {
  const { data } = await axios.get(`http://localhost:5000/comments/` + id);
  return data;
});
export const deleteComment = async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:5000/comments/` + id);
    return data;
  } catch (error) {
    console.log("Delete", error);
  }
};
export const addComment = async (commentData, id) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/comments/` + id,
      commentData
    );
    return data;
  } catch (error) {
    console.log("addComment", error);
  }
};
export const editComment = async (commentData, id) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/comments/` + id,
      commentData
    );
    return data;
  } catch (error) {
    console.log("editComment", error);
  }
};
