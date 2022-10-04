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
import InfoIcon from "@mui/icons-material/Info";
import { Stack } from "@mui/system";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SmsIcon from "@mui/icons-material/Sms";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, status } = useSelector(
    (state) => state.post
  );
  const handleShowDetail = async (id) => {
    navigate(`/post/${id}`);
  };
  useEffect(() => {
    dispatch(getPostsByGuest());
  }, []);
  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
      <h2>All Posts</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {posts && status === "loading" ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              status === "successful" &&
              posts.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      style={{ width: "300px" }}
                      src={`${row.avatar}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="left">
                    <h2>
                      <strong>{row.title}</strong>
                    </h2>
                    {row.summary}
                  </TableCell>
                  <TableCell align="center">
                    <ThumbUpIcon fontSize="large" />
                    <br />
                    {row.like}
                  </TableCell>
                  <TableCell align="center">
                    <SmsIcon fontSize="large" />
                    <br />
                    {row.comment}
                  </TableCell>
                  <TableCell align="center">
                    <Fab
                      color="warning"
                      aria-label="showdetail"
                      onClick={() => handleShowDetail(row._id)}
                    >
                      <InfoIcon />
                    </Fab>
                  </TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
      </Stack>
    </Box>
  );
}
