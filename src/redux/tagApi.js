import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Swal from "sweetalert2";

if ("login" in localStorage) {
  const login = JSON.parse(localStorage.getItem("login"));
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${login.accessToken}`;
}
const baseURL = "http://localhost:5000/tags";

export const getAllTags = createAsyncThunk("tag/getAllTags", async () => {
  let { data } = await axios.get(`${baseURL}`);
  console.log(data);
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
