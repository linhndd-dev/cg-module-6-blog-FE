import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Home from "./pages/CreatePost";
import { Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Container from "./components/Container";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import ListPost from "./pages/ListPost";
import { getAllMyPost } from "./redux/apis";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditPost from "./pages/EditPost";
import ShowDetail from "./pages/ShowDetail";

function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/post" element={<Post/>}>
              <Route path="list" element={<ListPost/>}></Route>
              <Route path="create" element={<CreatePost/>}></Route>
              <Route path="edit/:id" element={<EditPost/>}></Route>
              <Route path=":id" element={<ShowDetail/>}></Route>
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
