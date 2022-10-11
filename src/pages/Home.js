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
import PostHome from "../components/PostHome";

export default function Home() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.post);

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
          {posts.length > 0 &&
            status === "successful" &&
            posts.map((post, index) => {
              if (index == 0 || (index % 2 == 0 && index < 8))
                return <PostHome key={post._id} post={post} />;
            })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
