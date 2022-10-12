import {
  Box,
  Container,
  CssBaseline,
  Grid,
  ImageList,
  ImageListItem,
  styled,
  Typography,
  Pagination,
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
import PostHome from "../components/PostHome";
import { EffectFade } from "swiper";
import { Controller } from "swiper";
import PaginationSwiper from "../components/PaginationSwiper";
// Import Swiper styles

export default function Home() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost)
  const totalPages = Math.ceil(posts.length/postsPerPage)

  const handleChangePage = (e,page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    dispatch(getPostsByGuest());
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {status === "loading" && (
          <>
            <Loading />
          </>
        )}
        <Grid item xs={12}>
          <PaginationSwiper posts={posts}></PaginationSwiper>
        </Grid>
        <Grid item xs={12}>
          {posts.length > 0 &&
            status === "successful" &&
            currentPosts.map((post, index) => {
                return <PostHome key={post._id} post={post} />;
            })}
        </Grid>
      </Grid>
      <Stack alignItems="center">
      <Pagination count={totalPages} color="primary" onChange={handleChangePage} size="large" variant="outlined" shape="rounded" />
      </Stack>
    </React.Fragment>
  );
}
