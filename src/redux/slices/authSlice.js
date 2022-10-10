import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  status: "idle",
  isLoggedIn: false,
  user: {},
  profile: {},
  userStatus: "idle",
  notifications: [],
};

const REACT_APP_API_URL = "http://localhost:5000";

export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (props) => {
    try {
      console.log(props);
      const {data} = await axios.post(
        `${REACT_APP_API_URL}/auth/loginGoogle`,
        props.values
      );
      Swal.fire({
        icon: "success",
        title: "Login successful!",
      }).then((isConfirm) => {
        if (isConfirm) {
            props.navigate("/");
        }
      });
      return data;
    } catch (error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ values, resetForm, navigate }) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URL}/auth/login`,
        values
      );
      Swal.fire({
        icon: "success",
        title: "Login successful!",
      }).then((isConfirm) => {
        if (isConfirm) {
          if (values.username === "admin") {
            navigate("/admin/home");
          } else {
            navigate("/");
          }
        }
      });
      return data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      resetForm();
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ registerData, resetForm, navigate }) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URL}/auth/register`,
        registerData
      );
      Swal.fire({
        icon: "success",
        title: "Register successful!",
      });
      navigate("/login");
      return data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      resetForm();
    }
  }
);

export const getMyNotification = createAsyncThunk(
  "auth/getMyNotification",
  async () => {
    const { data } = await axios.get("http://localhost:5000/notifications")
    return data
  }
)
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state, action) => {
      localStorage.clear();
      state.isLoggedIn = false;
      axios.defaults.headers.common["authorization"] = null;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const { success, message, accessToken, idUser, username, avatar, fullname } = action.payload;
      localStorage.setItem(
        "login",
        JSON.stringify({
          success,
          message,
          accessToken,
          idUser,
          isLoggedIn: true,
          username,
          avatar,
          fullname
        })
      );
      state.status = "successful";
      state.isLoggedIn = true;
      state.user.idUser = idUser;
      state.user.username = username;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },
    [loginGoogle.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginGoogle.fulfilled]: (state, action) => {
      const { success, message, accessToken, idUser, username, avatar, fullname } = action.payload;
      localStorage.setItem(
        "login",
        JSON.stringify({
          success,
          message,
          accessToken,
          idUser,
          isLoggedIn: true,
          username,
          avatar,
          fullname
        })
      );
      state.status = "successful";
      state.isLoggedIn = true;
      state.user.idUser = idUser;
      state.user.username = username;
    },
    [loginGoogle.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },
    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoggedIn = true;
    },
    [getMyNotification.fulfilled]: (state, action) => {
      // state.status = "success";
      state.notifications = action.payload.notifications;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
export const { setAuth, logout, setCurrentUser } = authSlice.actions;
