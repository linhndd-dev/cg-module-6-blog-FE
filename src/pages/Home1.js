import { Box, Container, CssBaseline, ImageList, styled } from "@mui/material";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

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
            <Box gridColumn="span 6" sx={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
                  {posts && posts.length > 0 && status === "loading" && (
                    <>
                      <Loading />
                    </>
                  )}

                  {posts.length > 0 &&
                    status === "successful" &&
                    posts.map((post, index) => {
                          
                      if(index < 2){
                        return (
                        <Stack direction="row" spacing={2} sx={{display: "flex"}}>
                          <Item>  
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
                            <PostHome key={post._id} post={{item: post, index: index}} />
                          </Paper>
                          </Item>
                        </Stack>
                        )
                      }else if(index >= 2){
                        return (                        
                        <Item>
                          <PostHome1 key={post._id} post={{item: post, index: index}} />
                        </Item>)
                      }
                    }
                    )
                    }
            </Stack>

            </Box>
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
