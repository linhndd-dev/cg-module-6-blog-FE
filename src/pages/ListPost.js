import { Avatar, Box, Button, Container, CssBaseline, Fab, FormControl, FormHelperText, Grid, Input, InputLabel, Pagination, styled, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  deletePost,
  getAllMyPost,
  getDetailPost,
  searchMyPosts,
} from "../redux/apis";
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
import SearchIcon from '@mui/icons-material/Search';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  maxWidth: 400,
}));

export default function ListPost() {

  const pointer = {cursor : 'pointer'}

  const { posts, status } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const query = useQuery();
  const dispatch = useDispatch();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  const handleSubmit = (e) => {
    console.log(e);
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
  console.log(posts);
  return (
    <React.Fragment>
    <CssBaseline />
      <Container maxWidth="auto" sx={{margin:"0 120px"}}>
        <Box sx={{ bgcolor: '#f2f2f2', height: "auto" }} >
          <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
              <Box display="grid"  gridColumn="span 10" gridTemplateColumns="repeat(12, 1fr)" gap={3} marginBottom={"20px"} >
                <Box gridColumn="span 6" sx={{display: "flex", justifyContent: "flex-start"}}>
                  <h2>My Posts</h2>
                </Box>
                <Box gridColumn="span 6" textAlign={"right"} sx={{display: "flex", paddingTop:"10px", justifyContent: "flex-end", width: "400px", paddingRight: "20px"}}>
                  <Box>
                  <SearchIcon sx={{marginTop: "10px", marginRight:"10px", opacity: "0.3"}} fontSize="large"/>
                  </Box>
                  <Box >
                  <FormControl className="d-flex input-group w-auto" sx={{width: "200px", bgColor:"white"}} >
                    <form onSubmit={handleSubmit}>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Search"
                      placeholder="Title"
                      onChange={(e)=>{ setSearch(e.target.value)}}
                      style={{width: "400px", bgColor: "white"}}
                    />
                    </form>
                  </FormControl>

                  </Box>
                </Box>
                
              </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableBody sx={{borderSpacing: "5em"  }}>
                  {posts && posts.length > 0 && status === 'loading' && (
                    <>
                    <Loading/>
                    </>
                  )}
                  {posts.length > 0 && status === 'successful' &&
                    posts.map((row) => {
                      const day = new Date(row.createdAt); 
                      return(
                      <TableRow
                        mb={"8px"}
                        key={row._id}
                        pb={"8px"}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                      >
                        <TableCell component="th" scope="row">
                          <Avatar src={`${row.avatar}`} sx={{
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "5px",
                            height: "150px",
                            width: "200px"
                          }} variant="rounded"/>
                        </TableCell>
                        <TableCell align="left">
                        <Box display="grid"  gridColumn="span 10" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
                          <Box gridColumn="span 12">
                          <Typography className="title"
                                      style={pointer}
                                      variant="h5" display="block"
                                      gutterBottom
                                      // sx={{PointerEvent: "cursor"}}
                                      onClick={() => handleShowDetail(row._id)}
                          >
                          <strong>{row.title}</strong>
                          </Typography>
                          </Box>
                          <Box gridColumn="span 12" sx={{ flexGrow: 1, overflow: 'hidden'}}>
                          <StyledPaper>
                                <Typography border={"none"} noWrap>{row.summary}</Typography>
                          </StyledPaper>
                          </Box>
                          <Box gridColumn="span 12">
                          <Typography variant="outline" display="block" gutterBottom>
                            {day.toLocaleDateString()}
                          </Typography>
                          </Box>
                          
                        </Box>
                        </TableCell>

                        <TableCell align="center">
                          <ThumbUpIcon fontSize="small" />
                          <br />
                          {row.like}
                        </TableCell>
                        <TableCell align="center">
                          <SmsIcon fontSize="small" />
                          <br />
                          {row.comment}
                        </TableCell>
                        <TableCell align="center">
                          <Fab
                            color="primary"
                            aria-label="edit"
                            size="small" 
                            onClick={() => handleEditPost(row._id)}
                          >
                            <EditIcon  />
                          </Fab>
                        </TableCell>

                        <TableCell align="center">
                          <Fab
                            color="warning"
                            aria-label="delete"
                            size="small" 
                            onClick={() => handleClickOpen(row._id)}
                          >
                            <DeleteIcon />
                          </Fab>
                        </TableCell>
                      </TableRow>)
                    }
                    )}
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
        </Box>
      </Container>
      </React.Fragment>

  );
}
