import { Box, Button, Fab, Pagination, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostsByGuest } from "../redux/apis";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import { setCurrentPage } from "../redux/slices/postSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value));
  };
  const { posts, status, currentPage, numberOfPages } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    dispatch(getPostsByGuest(currentPage));
  }, [currentPage, dispatch]);
  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
      <h2>All Posts</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Summary</TableCell>
              <TableCell align="right">Like</TableCell>
              <TableCell align="right">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts && status === "loading" ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              status === "successful" &&
              status === "successful" &&
              posts.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      style={{ width: "50px" }}
                      src={`${row.avatar}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.summary}</TableCell>
                  <TableCell align="right">{row.like}</TableCell>
                  <TableCell align="right">{row.comment}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={numberOfPages ? numberOfPages : 1}
          color="primary"
          onChange={handleChangePage}
        />
      </Stack>
    </Box>
  );
}
