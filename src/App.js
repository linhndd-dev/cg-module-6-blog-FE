import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "./pages/Layout";
import AdminLayout from "./pages/AdminLayout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import ListPost from "./pages/ListPost";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditPost from "./pages/EditPost";
import { setAuth } from "./redux/slices/authSlice";
import SinglePost from "./pages/SinglePost";
import axios from "axios";
import AdminPost from "./pages/Admin/AdminPost";
import AdminUser from "./pages/Admin/AdminUser";
import AdminHome from "./pages/Admin/AdminUser";
import CreatePost from "./pages/CreatePost";
import { setCurrentUser } from "./redux/slices/authSlice";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import ProtectedPostRoute from "./utils/ProtectedPostRoute";
import { getMyNotification } from "./redux/slices/authSlice";


function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  if ("login" in localStorage) {
    const login = JSON.parse(localStorage.getItem("login"));
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${login.accessToken}`;
  }
  useEffect(() => {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
    if (isLoggedIn) {
      dispatch(setAuth({ isLoggedIn }));
      const login = JSON.parse(localStorage.getItem("login"));
      dispatch(setCurrentUser(login));
      dispatch(getMyNotification());
    }
  }, [dispatch, isLoggedIn]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>

        <Route path="/post" element={<Layout />}>
          <Route
            path="search"
            element={
              <PrivateRoute>
                <ListPost />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="list"
            element={
              <PrivateRoute>
                <ListPost />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          ></Route>
          <Route path=":id" element={<SinglePost />}></Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="home"
            element={
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            }
          />
          <Route
            path="users/search"
            element={
              <AdminRoute>
                <AdminUser />
              </AdminRoute>
            }
          />
          <Route
            path="posts/search"
            element={
              <AdminRoute>
                <AdminPost />
              </AdminRoute>
            }
          />
          <Route
            path="posts"
            element={
              <AdminRoute>
                <AdminPost />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="users"
            element={
              <AdminRoute>
                <AdminUser />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
