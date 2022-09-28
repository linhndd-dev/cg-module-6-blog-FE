import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/CreatePost";
import { Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Container from "./components/Container";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/login"></Route>
            <Route path="/register"></Route>
            <Route path="/"></Route>
            <Route path="/post" element={<Post/>}>
              <Route path="create" element={<CreatePost/>}></Route>
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
