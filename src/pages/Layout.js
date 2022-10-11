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

export default function Layout() {
  const { posts, status } = useSelector((state) => state.post);

  return (
    <React.Fragment>
      <Box>
        <Box sx={{ display: "fixed" }}>
          <Header />
        </Box>
        <Toolbar />
        <Container width="80%">
          <Stack spacing={2}>
            <Item sx={{ padding: "20px", marginTop: "40px" }}>
              <Grid container spacing={2}>
                {status === "loading" && (
                  <>
                    <Loading />
                  </>
                )}
                <Grid item xs={8} sx={{ paddingRight: "20px" }}>
                  <Outlet></Outlet>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ paddingBottom: "40px", lineHeight: "1.6" }}>
                    <Typography
                      fontWeight="bold"
                      color="black"
                      variant="h5"
                      align="left"
                    >
                      Favorite Posts
                    </Typography>
                    <hr />
                    {posts.length > 0 &&
                      status === "successful" &&
                      posts.map((post, index) => {
                        if (index < 3)
                          return (
                            <ImageListItem>
                              <FavoritePosts key={post._id} post={post} />
                            </ImageListItem>
                          );
                      })}
                  </Box>
                  <Box
                    sx={{
                      bgcolor: primary,
                      borderRadius: "10px",
                      marginBottom: "40px",
                    }}
                  >
                    <Members />
                    <Members />
                    <Members />
                    <Members />
                  </Box>
                  <Box sx={{ paddingBottom: "40px" }}>
                    <Typography
                      fontWeight="bold"
                      color="black"
                      variant="h5"
                      align="left"
                    >
                      Favorite Posts
                    </Typography>
                    <hr />
                    {posts.length > 0 &&
                      status === "successful" &&
                      posts.map((post, index) => {
                        if (index < 3)
                          return (
                            <ImageListItem>
                              <FavoritePosts key={post._id} post={post} />
                            </ImageListItem>
                          );
                      })}
                  </Box>
                </Grid>
              </Grid>
            </Item>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
