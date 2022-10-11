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
  maxWidth: 310,
  gutterBottom: "true",
  variant: "h6",
  fontWeight: "bold",
  color: "black",
  align: "left",
  marginLeft: "10px",
}));

const StyledTypographySummary = styled(Typography)(({ theme }) => ({
  backgroundColor: "transparent",
  maxWidth: 210,
  gutterBottom: "true",
  variant:"caption",
  align: "left",
  marginLeft: "10px",
  paddingBottom: "40px",
}));

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
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

  // console.log(post);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <ButtonBase sx={{ width: 350, height: 230 }} onClick={() => handleShowDetail(post._id)} >
            <Img alt="complex" src={`${post.avatar}`} sx={{marginTop: "0px", marginBottom: "0px"}}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs sx={{ position: "relative" }}>
            <StyledTypographyTitle noWrap>{post.title}</StyledTypographyTitle>
            <Typography
              variant="body2"
              color="text.secondary"
              align="left"
              marginLeft="10px"
            >
              {post.author.username} {"-"} {day.toLocaleDateString()}
            </Typography>
            <StyledTypographySummary noWrap>
              {post.summary}
            </StyledTypographySummary>
            <Typography
              sx={{ position: "absolute", top: "35px", right: "10px" }}
            >
              <LikeBox
                likeCount={likeCount}
                liked={post.isLiked}
                onLike={handleLike}
              />
              <SmsIcon fontSize="small" />
              {post.comment}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
