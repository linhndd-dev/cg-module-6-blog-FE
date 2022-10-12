import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Pagination,
  styled,
  TextField,
  Typography,
} from "@mui/material";
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
import SmsIcon from "@mui/icons-material/Sms";
import Loading from "../components/Loading";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDetailPost } from "../redux/apis";
import React, { useEffect, useState } from "react";
import { deletePost } from "../redux/apis";
import { likePost,unlikePost } from "../redux/apis";
import LikeBox from "./LikeBox";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";

const StyledPaper = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  maxWidth: 400,
}));

export default function Post({ post }) {
  // console.log(post.isLiked);
  const login = JSON.parse(localStorage.getItem("login"));
  const userId = login?.idUser;
  const navigate = useNavigate();
  const day = new Date(post.createdAt);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [likeCount, setLikeCount] = useState(post.like)

  const handleEditPost = async (id) => {
    await dispatch(getDetailPost(id));
    navigate(`/user/post/edit/${id}`);
  };

  const handleShowDetail = async (postId) => {
    navigate(`/post/${postId}`);
  };
  const handleClickOpen = (id) => {
    setPostId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeletePost = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(id));
      }
    })
    
  };

  const handleLike = async (isLiked) => {
    if (isLiked) {
        setLikeCount(likeCount + 1);
        await likePost(post._id);
    } else {
        setLikeCount(likeCount - 1);
        await unlikePost(post._id);
    }
  }
  return (
    <>
    <Container mx="auto">
      <TableRow
        mb={"8px"}
        key={post._id}
        pb={"8px"}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Avatar
            src={`${post.avatar}`}
            sx={{
              borderRadius: "10",
              height: "150px",
              width: "200px",
            }}
            variant="rounded"
            style={{ borderRadius: 10 }}
          />
        </TableCell>
        <TableCell align="left" width="800px">
          <Box
            display="grid"
            gridColumn="span 10"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={3}
          >
            <Box gridColumn="span 12">
              <Typography
                variant="h5"
                maxWidth="800px"
                noWrap 
                gutterBottom
                onClick={() => handleShowDetail(post._id)}
              >
                <strong>{post.title}</strong>
              </Typography>
            </Box>
            <Box gridColumn="span 12" sx={{ flexGrow: 1, overflow: "hidden" }}>
              <StyledPaper>
                <Typography border={"none"} noWrap>
                  {post.summary}
                </Typography>
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
        <LikeBox
              likeCount={likeCount}
              liked={post.isLiked}
              onLike={handleLike}
            />
        </TableCell>
        <TableCell align="center">
          <IconButton >
              <SmsIcon fontSize="small" />
            </IconButton>
          {post.comment}
        </TableCell>
        {post.author._id === userId && (
          <TableCell align="center">
            <Fab
              color="primary"
              aria-label="edit"
              size="small"
              onClick={() => handleEditPost(post._id)}
            >
              <EditIcon />
            </Fab>
          </TableCell>
        )}

        {post.author._id === userId && (
          <TableCell align="center">
            <Fab
              color="warning"
              aria-label="delete"
              size="small"
              onClick={() => handleDeletePost(post._id)}
            >
              <DeleteIcon />
            </Fab>
          </TableCell>
        )}
      </TableRow>
    </Container>
    </>
  );
}
