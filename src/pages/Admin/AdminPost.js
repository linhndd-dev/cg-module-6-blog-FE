import {
  Box,
  Button,
  Fab,
  Pagination,
  TextField,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getPostsFromAdmin,
  deletePostFromAdmin,
  searchPostsByTitle,
} from "../../redux/adminApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SmsIcon from "@mui/icons-material/Sms";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";

export default function ListPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const { posts, status } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPostsFromAdmin());
  }, []);
  const handleDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deletePostFromAdmin(id));
      }
    });
  };
  const handleShowDetail = async (id) => {
    navigate(`/post/${id}`);
  };

  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchPostsByTitle(search));
      navigate(`/admin/posts/search?searchQuery=${search}`);
    } else {
      dispatch(getPostsFromAdmin());
    }
  };
  return (
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
          <h2>All Post</h2>
        </Box>
        <Box
          gridColumn="span 6"
          textAlign={"right"}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "10px",
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
              sx={{ bgColor: "white" }}
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
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h3>Avatar</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Title</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Likes</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Comments</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Status</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Author</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Create At</h3>
              </TableCell>
              <TableCell align="center" colSpan={2}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length > 0 &&
              status === "successful" &&
              posts.map((row) => {
                const date = new Date(row.createdAt);
                return (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img style={{ width: "100px" }} src={`${row.avatar}`} />
                    </TableCell>
                    <TableCell align="left">
                      <h4>{row.title}</h4>
                    </TableCell>
                    <TableCell align="center">
                      <br />
                      {row.like}
                    </TableCell>
                    <TableCell align="center">
                      <br />
                      {row.comment}
                    </TableCell>
                    <TableCell align="left">{row.accessModified}</TableCell>
                    <TableCell align="left">{row.author.username}</TableCell>
                    <TableCell align="left">{date.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Fab
                        color="secondary"
                        aria-label="showdetail"
                        onClick={() => handleShowDetail(row._id)}
                        size="small"
                      >
                        <InfoIcon fontSize="small" />
                      </Fab>
                    </TableCell>
                    <TableCell align="center">
                      <Fab
                        color="warning"
                        onClick={() => handleDeletePost(row._id)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </Fab>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        {posts.length === 0 && status === "successful" && (
          <p>You don't have any post yet!</p>
        )}
      </Stack>
    </Box>
  );
}
