import { Box, Container, CssBaseline } from "@mui/material";
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

export default function Home() {
  const dispatch = useDispatch();

  const { posts, status } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsByGuest());
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="auto" sx={{ margin: "0 120px" }}>
        <Box sx={{ bgcolor: "#f2f2f2", height: "auto" }}>
          <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
            <Box
              display="grid"
              gridColumn="span 10"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={3}
              marginBottom={"20px"}
            >
              <Box
                gridColumn="span 6"
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <h2>All Posts</h2>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody sx={{ borderSpacing: "5em" }}>
                  {posts && posts.length > 0 && status === "loading" && (
                    <>
                      <Loading />
                    </>
                  )}
                  {posts.length > 0 &&
                    status === "successful" &&
                    posts.map((post) => <Post key={post._id} post={post} />)}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack spacing={2}>
              {posts.length === 0 && status === "successful" && (
                <p>You don't have any post yet!</p>
              )}
            </Stack>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
