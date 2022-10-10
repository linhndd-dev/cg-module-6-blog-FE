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
import { getDetailPost } from "../redux/apis";
import React, { useEffect, useState } from "react";
import { deletePost } from "../redux/apis";
import IconButton from "@mui/material/IconButton";

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  backgroundColor: "transparent",
  maxWidth: 400,
  gutterBottom: "true",
  variant: "h6",
  fontWeight: "bold",
  color: "white",
  align: "left",
}));
export default function PostHome1({ post }) {
  const login = JSON.parse(localStorage.getItem("login"));
  const userId = login?.idUser;
  const navigate = useNavigate();
  const day = new Date(post.createdAt);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);

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
    <Box>
      <ButtonBase onClick={() => handleShowDetail(post._id)}>
        <ImageListItem
          key={post._id}
          sx={{ width: "550px", maxHeight: "300px", position: "relative" }}
        >
          <img
            src={`${post.avatar}?w=248&fit=crop&auto=format`}
            srcSet={`${post.avatar}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={post.title}
            loading="lazy"
          />
          <Grid
            container
            spacing={2}
            sx={{
              position: "absolute",
              top: "200px",
              left: "20px",
              color: "white",
              textAlign: "left",
            }}
          >
            <Grid item xs={12}>
                <StyledTypographyTitle variant="h5" noWrap color="white">
                  <strong>{post.title}</strong>
                </StyledTypographyTitle>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom opaci>
                <strong>{post.author.fullname}</strong> {"-"}
                <i> {day.toLocaleDateString()} </i>
              </Typography>
            </Grid>
          </Grid>
        </ImageListItem>
      </ButtonBase>
    </Box>
  );
}
