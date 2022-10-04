import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/CreatePost";
import { Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Container from "./components/Container";
import CreatePost from "./pages/CreatePost";
import Layout from "./pages/Layout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import ListPost from "./pages/ListPost";
import { getAllMyPost } from "./redux/apis";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditPost from "./pages/EditPost";
import { setAuth } from "./redux/slices/authSlice";
import SinglePost from "./pages/SinglePost";
import axios from "axios";
import AdminPost from "./pages/Admin/AdminPost";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  if ("login" in localStorage) {
    console.log(12);
    const login = JSON.parse(localStorage.getItem("login"));
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${login.accessToken}`;
  }
  useEffect(() => {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
    if (isLoggedIn) {
      dispatch(setAuth({ isLoggedIn }));
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
          <Route path="list" element={<ListPost />}></Route>
          <Route path="create" element={<CreatePost />}></Route>
          <Route path="edit/:id" element={<EditPost />}></Route>
          <Route path=":id" element={<SinglePost />}></Route>
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route path="post" element={<AdminPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
