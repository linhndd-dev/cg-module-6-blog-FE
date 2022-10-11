import {
  Box,
  Container,
  CssBaseline,
  Grid,
  ImageList,
  ImageListItem,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByGuest } from "../redux/apis";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import Loading from "../components/Loading";
import Post from "../components/Post";
import PostHome1 from "../components/PostHome1";
import PostHome2 from "../components/PostHome2";
import PostHome3 from "../components/PostHome3";
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
const primary = teal[100];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});
export default function Home() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsByGuest());
  }, []);
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const swiper = useSwiper();

  return (
    <React.Fragment>
      <Container width="80%">
        <Stack spacing={2}>
          <Item sx={{ padding: "20px", marginTop: "40px"}}>
            <Grid container spacing={2}>
              {status === "loading" && (
                <>
                  <Loading />
                </>
              )}
              <Grid item xs={8} sx={{paddingRight:"20px"}}>
                <Grid container spacing={2}>
                  {status === "loading" && (
                    <>
                      <Loading />
                    </>
                  )}
                  <Grid item xs={12}>
                    {posts.length > 0 &&
                      status === "successful" &&
                      posts.map((post, index) => {
                        if (index == 0 || (index % 2 == 0 && index < 8))
                          return <PostHome3 key={post._id} post={post} />;
                      })}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{paddingBottom:"40px", lineHeight:"1.6"}}>
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
                <Box sx={{ bgcolor: primary, borderRadius:"10px", marginBottom:"40px" }}>
                  <Members/>
                  <Members/>
                  <Members/>
                  <Members/>
                </Box>
                <Box sx={{paddingBottom:"40px"}}>
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
    </React.Fragment>
  );
}
