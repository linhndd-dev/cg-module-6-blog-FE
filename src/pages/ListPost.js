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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SmsIcon from "@mui/icons-material/Sms";
import Loading from "../components/Loading";
import { searchMyPosts } from "../redux/apis";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ListPost() {
  const { posts, status } = useSelector(
    (state) => state.post
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const query = useQuery();
  const dispatch = useDispatch();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();
  console.log(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchMyPosts(search));
      navigate(`/post/search?searchQuery=${search}`);
      // setSearch("");
    } else {
      dispatch(getAllMyPost());
    }
  };

  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  

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
    dispatch(getAllMyPost());
  }, []);
  const handleEditPost = async (id) => {
    await dispatch(getDetailPost(id));
    navigate(`/post/edit/${id}`);
  };
  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
      
        <h2>My Posts</h2>
        <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <label>Search post by title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search Post"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              
            </div>
          </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {posts && posts.length > 0 && status === 'loading' && (
              <>
              <Loading/>
              </>
            )}
            {posts.length > 0 && status === 'successful' &&
              posts.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img style={{ width: "300px" }} src={`${row.avatar}`} />
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
        {posts.length === 0 && status === "successful" && (
          <p>You don't have any post yet!</p>
        )}
      </Stack>
    </Box>
  );
}
