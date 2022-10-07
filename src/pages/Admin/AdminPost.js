import { Box, Button, Fab, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getPostsFromAdmin, deletePostFromAdmin } from "../../redux/adminApi";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ListPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const { posts, status } = useSelector((state) => state.post);

  const handleDeletePost = async (id) => {
    await dispatch(deletePostFromAdmin(id));
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
    dispatch(getPostsFromAdmin());
  }, []);
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
            paddingTop: "10px",
            justifyContent: "flex-end",
            width: "400px",
            paddingRight: "20px",
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
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h3>AVATAR</h3>
              </TableCell>
              <TableCell align="center">
                <h3>TITLE</h3>
              </TableCell>
              <TableCell align="center">
                <h3>DESCRIPTION</h3>
              </TableCell>
              <TableCell align="center">
                <h3>LIKES</h3>
              </TableCell>
              <TableCell align="center">
                <h3>COMMENTS</h3>
              </TableCell>
              <TableCell align="center">
                <h3>STATUS</h3>
              </TableCell>
              <TableCell align="center">
                <h3>USERNAME</h3>
              </TableCell>
              <TableCell align="center">
                <h3>CREATED AT</h3>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                <h3>ACTIONS</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length > 0 &&
              status === "successful" &&
              posts.map((row) => (
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
                  <TableCell align="left">{row.summary}</TableCell>
                  <TableCell align="center">
                    <ThumbUpIcon fontSize="medium" />
                    <br />
                    {row.like}
                  </TableCell>
                  <TableCell align="center">
                    <SmsIcon fontSize="medium" />
                    <br />
                    {row.comment}
                  </TableCell>
                  <TableCell align="left">{row.accessModified}</TableCell>
                  <TableCell align="left">{row.author.username}</TableCell>
                  <TableCell align="left">{row.createdAt}</TableCell>
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
          {"Are you sure you want to delete this post?"}
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
