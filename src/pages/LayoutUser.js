import {
  Box,
  Container,
  CssBaseline,
  Grid,
  ImageList,
  ImageListItem,
  styled,
  Toolbar,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import { Controller } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Virtual } from "swiper";
import { useSwiper } from "swiper/react";
import FavoritePosts from "../components/FavoritePosts";
import Members from "../components/Members";
import { purple, red, teal } from "@mui/material/colors";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
const primary = teal[100];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function LayoutUser() {
  const { posts, status } = useSelector((state) => state.post);

  return (
    <React.Fragment>
      <Box>
        <Box sx={{ display: "fixed" }}>
          <Header />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Navbar></Navbar>
          </Box>
          <Box sx={{marginTop: "74px", width: "100%"}}>
            <Outlet></Outlet>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
