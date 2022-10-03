import { Box, Button, Fab, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { deletePost, getAllMyPost, getDetailPost } from "../redux/apis";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { setCurrentPage } from "../redux/slices/postSlice";
import { searchMyPosts } from "../redux/apis";

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
  }
  const handleDeletePost = async (id) => {
    await dispatch(deletePost(id));
    handleClose();
  };
  const handleShowDetail = async (id) => {
    navigate(`/post/${id}`)
}
  const handleClickOpen = (id) => {
    setPostId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getAllMyPost(currentPage));
  }, [currentPage,dispatch]);
  const handleEditPost = async (id) => {
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
      <Button variant="contained" size="large" onSubmit={handleSearch}>Search</Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Summary</TableCell>
              <TableCell align="right">Like</TableCell>
              <TableCell align="right">Comment</TableCell>
              <TableCell align="center" colSpan={2}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts && posts.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img style={{ width: "50px" }} src={`${row.avatar}`} />
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.summary}</TableCell>
                <TableCell align="right">{row.like}</TableCell>
                <TableCell align="right">{row.comment}</TableCell>
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
                        <Fab color="warning" aria-label="showdetail" onClick={() => handleShowDetail(row._id)}>
                            <EditIcon />
                        </Fab>
                    </TableCell>
                <TableCell align="center">
                  <Fab
                    color="secondary"
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
        <Pagination count={numberOfPages ? numberOfPages : 1} color="primary" onChange={handleChangePage} />
      </Stack>
    </Box>
  );
}
