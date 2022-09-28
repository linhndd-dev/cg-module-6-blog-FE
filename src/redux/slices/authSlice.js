import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  isLoggedIn: false,
  user: {},
  profile: {},
  userStatus: "idle",
  users: [],
};

const REACT_APP_API_URL = "http://localhost:5000";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
        const { data } = await axios.post(
            `${REACT_APP_API_URL}/api/auth/login`,
            userData
          );
          return data;
    } catch (error) {
        console.log(error);
    }
    
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const { success, message, accessToken, userId } =
        action.payload;
      localStorage.setItem(
        "login",
        JSON.stringify({
          success,
          message,
          accessToken,
          userId
        })
      );
      state.status = 'successful';
      state.isLoggedIn = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;

