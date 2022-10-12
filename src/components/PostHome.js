import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Container,
  CssBaseline,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SmsIcon from "@mui/icons-material/Sms";
import Loading from "./Loading";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDetailPost, likePost, unlikePost } from "../redux/apis";
import React, { useEffect, useState } from "react";
import { deletePost } from "../redux/apis";
import IconButton from "@mui/material/IconButton";
import LikeBox from "./LikeBox";

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  backgroundColor: "transparent",
  maxWidth: "100%",
  gutterBottom: "true",
  variant: "h6",
  fontWeight: "bold",
  color: "black",
  marginLeft: "10px",
}));

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "350px",
  maxHeight: "300px",
  borderRadius: "10px"
});
export default function PostHome3({ post }) {
  const login = JSON.parse(localStorage.getItem("login"));
  const userId = login?.idUser;
  const navigate = useNavigate();
  const day = new Date(post.createdAt);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [likeCount, setLikeCount] = useState(post.like);

  const handleLike = async (isLiked) => {
    if (isLiked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id);
    }
  };
  const handleEditPost = async (id) => {
    await dispatch(getDetailPost(id));
    navigate(`/post/edit/${id}`);
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
    await dispatch(deletePost(id));
    handleClose();
  };
  return (
    <>
      <Grid container spacing={2} marginBottom="30px" sx={{ position: "relative" }}>
        <Grid item xs={6}>
          <ButtonBase onClick={() => handleShowDetail(post._id)}>
            <Img alt="complex" src={`${post.avatar}`}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={6} >
          <ButtonBase onClick={() => handleShowDetail(post._id)}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="black"
              align="justify"
            >
              {post.title}
            </Typography>
          </ButtonBase>
          <Typography align="left" sx={{ opacity: "0.5" }}>
            {post.author.fullname} {"-"} {day.toLocaleDateString()}
          </Typography>
          <Typography align="justify" fontSize="14px">
            {post.summary.length > 100
              ? `${post.summary.substring(0, 100)}...`
              : post.summary}
          </Typography>
        </Grid>
          <Typography
            sx={{ position: "absolute", bottom: "-8px", right: "20px" }}
          >
            <LikeBox
              likeCount={likeCount}
              liked={post.isLiked}
              onLike={handleLike}
            />
            <IconButton sx={{ marginLeft: "10px" }}>
              <SmsIcon fontSize="small" />
            </IconButton>
            {post.comment}
          </Typography>
      </Grid>
    </>
  );
}
