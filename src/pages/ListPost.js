import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  TextField,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllMyPost, searchMyPosts } from "../redux/apis";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import Loading from "../components/Loading";
import SearchIcon from "@mui/icons-material/Search";
import Post from "../components/Post";
import TableRow from "@mui/material/TableRow";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ListPost() {

  const pointer = {cursor : 'pointer'}

  const { posts, status } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleChangePage = (e, page) => {
    setCurrentPage(page);
  };
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (search) {
      dispatch(searchMyPosts(search));
      navigate(`/user/post/search?searchQuery=${search}`);
      // setSearch("");
    } else {
      dispatch(getAllMyPost());
    }
  };
  useEffect(() => {
    dispatch(getAllMyPost());
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ height: "auto" }}>
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
                <h2>My Posts</h2>
              </Box>
              <Box
                gridColumn="span 6"
                textAlign={"right"}
                sx={{
                  display: "flex",
                  paddingTop: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <Box>
                  <SearchIcon
                    sx={{
                      marginTop: "10px",
                      marginRight: "10px",
                      opacity: "0.3",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Box>
                  <FormControl
                    className="d-flex input-group w-auto"
                    sx={{ width: "200px", bgColor: "white" }}
                  >
                    <form onSubmit={handleSubmit}>
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Search"
                        placeholder="Title"
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        style={{ width: "400px", bgColor: "white" }}
                      />
                    </form>
                  </FormControl>
                </Box>
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
                    currentPosts.map((post) => (
                      <Post key={post._id} post={post} />
                    ))}
                  {posts.length > 0 && status === "successful" && (
                    <Stack alignItems="center">
                      <Pagination
                        count={totalPages}
                        color="primary"
                        onChange={handleChangePage}
                        size="large"
                        variant="outlined"
                        shape="rounded"
                      />
                    </Stack>
                  )}
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
