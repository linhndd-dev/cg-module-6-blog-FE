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
import PostHome4 from "../components/PostHome4";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
          <Item sx={{ width: "auto" }}>
            <Container>
              <Swiper
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                slidesPerView={2}
                modules={[Navigation, Pagination]}
                className="mySwiper"
                rewind={true}
              >
                {status === "loading" && (
                  <>
                    <Loading />
                  </>
                )}
                {posts.length > 0 &&
                  status === "successful" &&
                  posts.map((post, index) => {
                    if (index < 4) {
                      return (
                        <SwiperSlide>
                          <PostHome1 key={post._id} post={post} />
                        </SwiperSlide>
                      );
                    }
                  })}
              </Swiper>
            </Container>
          </Item>
          <Item>
            <Container>
              <Swiper
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                slidesPerView={6}
                modules={[Navigation, Pagination]}
                className="mySwiper"
                rewind={true}
              >
                {status === "loading" && (
                  <>
                    <Loading />
                  </>
                )}
                {posts.length > 0 &&
                  status === "successful" &&
                  posts.map((post, index) => {
                    return (
                      <SwiperSlide>
                        <PostHome2 key={post._id} post={post} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </Container>
          </Item>
          <Item>
            <Grid container spacing={2}>
              {status === "loading" && (
                <>
                  <Loading />
                </>
              )}
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  {status === "loading" && (
                    <>
                      <Loading />
                    </>
                  )}
                  <Grid item xs={6}>
                    {posts.length > 0 &&
                      status === "successful" &&
                      posts.map((post, index) => {
                        if (index == 0 || (index % 2 == 0 && index < 8))
                          return <PostHome3 key={post._id} post={post} />;
                      })}
                  </Grid>
                  <Grid item xs={6}>
                    {posts.length > 0 &&
                      status === "successful" &&
                      posts.map((post, index) => {
                        if (index === 1 || (index % 2 !== 0 && index < 9))
                          return <PostHome3 key={post._id} post={post} />;
                      })}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
              <Typography position="relative" variant="h5" align="left" display="fixed">Related to</Typography>
                <ImageList
                  sx={{ width: 400, height: 1300 }}
                  cols={1}
                  rowHeight={164}
                >

                  {posts.length > 0 &&
                    status === "successful" &&
                    posts.map((post, index) => {
                      return (
                        <ImageListItem>
                          <PostHome4 key={post._id} post={post} />
                        </ImageListItem>
                      );
                    })}
                </ImageList>
              </Grid>
            </Grid>
          </Item>
        </Stack>
      </Container>

      {/* <Container maxWidthMd>
          <Swiper
            navigation={true}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
            rewind={true}
          >
            {status === "loading" && (
              <>
                <Loading />
              </>
            )}
            {posts.length > 0 &&
            status === "successful" &&
            posts.map((post, index) => {
              if (index < 4) {
                return (
                  <SwiperSlide>
                    <PostHome1 key={post._id} post={post} />
                  </SwiperSlide>

                );
              }
            })}
          </Swiper>
          </Container> */}
    </React.Fragment>
  );
}
