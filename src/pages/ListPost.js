import { Box, Button, Fab, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { deletePost, getAllMyPost, getDetailPost } from "../redux/apis";
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
import { setCurrentPage } from "../redux/slices/postSlice";
import { searchMyPosts } from "../redux/apis";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import GradeIcon from "@mui/icons-material/Grade";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function ListPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value));
  };
  const { posts, status, currentPage, numberOfPages } = useSelector(
    (state) => state.post
  );
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  const handleSearch = (e) => {
    console.log(search);
    e.preventDefault();
    if (search) {
      dispatch(searchMyPosts(search));
      navigate(`/posts/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/post/list");
    }
  };
  const handleDeletePost = async (id) => {
    await dispatch(deletePost(id));
    handleClose();
  };
  const handleShowDetail = async (id) => {
    navigate(`/post/${id}`);
  };
  const handleClickOpen = (id) => {
    setPostId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getAllMyPost(currentPage));
  }, [currentPage, dispatch]);
  const handleEditPost = async (id) => {
    await dispatch(getDetailPost(id));
    navigate(`/post/edit/${id}`);
  };
  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
      <form>
        <h2>My Posts</h2>
        <TextField
          sx={{ minWidth: 650 }}
          label={"Search Posts"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" size="large" onSubmit={handleSearch}>
          Search
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {posts &&
              posts.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img style={{ width: "200px" }} src={`${row.avatar}`} />
                  </TableCell>
                  <TableCell align="left">
                    <h3>
                      <strong>{row.title}</strong>
                    </h3>
                    {row.summary}
                  </TableCell>

                  <TableCell align="center">
                    <ThumbUpIcon fontSize="large" />
                    <br />
                    {row.like}
                  </TableCell>
                  <TableCell align="center">
                    <GradeIcon fontSize="large" />
                    <br />
                    {row.comment}
                  </TableCell>
                  <TableCell align="center">
                    <Fab
                      color="secondary"
                      aria-label="showdetail"
                      onClick={() => handleShowDetail(row._id)}
                    >
                      <InfoIcon />
                    </Fab>
                  </TableCell>
                  <TableCell align="center">
                    <Fab
                      color="primary"
                      aria-label="edit"
                      onClick={() => handleEditPost(row._id)}
                    >
                      <EditIcon />
                    </Fab>
                  </TableCell>

                  <TableCell align="center">
                    <Fab
                      color="warning"
                      aria-label="delete"
                      onClick={() => handleClickOpen(row._id)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete the post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleDeletePost(postId)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
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
