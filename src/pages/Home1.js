import {
  Box,
  Container,
  CssBaseline,
  Grid,
  ImageList,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
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
import PostHome1 from "../components/PostHome1";
import PostHome2 from "../components/PostHome2";

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
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{paddingTop: "40px"}}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {status === "loading" && (
            <>
              <Loading />
            </>
          )}
          {posts.length > 0 &&
            status === "successful" &&
            posts.map((post, index) => {
              if (index < 2) {
                return (
                  <Grid item xs={2} sm={4} md={6}>
                    <PostHome1 key={post._id} post={post} />
                  </Grid>
                );
              }
              
              if(index >= 2){
                return (
                  <Grid item xs={2} sm={4} md={6} padding="40px">
                    <Paper
                      sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                      }}
                    >
                    <PostHome2 key={post._id} post={post} />
                    </Paper>
                  </Grid>
                )
              }
            })}
        </Grid>
        <Stack spacing={2}>
          {posts.length === 0 && status === "successful" && (
            <p>You don't have any post yet!</p>
          )}
        </Stack>
      </Container>
    </React.Fragment>
  );
}
