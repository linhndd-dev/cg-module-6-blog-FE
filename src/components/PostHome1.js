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

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',

  maxWidth: 400,
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

  console.log(post);
  return (
    <Box>
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
            <StyledPaper>
              <Typography variant="h5" noWrap color="white">
                <strong>{post.title}</strong>
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              <strong>{post.author.username}</strong> {"-"}<i> {day.toLocaleDateString()} </i>
            </Typography>
          </Grid>
        </Grid>
      </ImageListItem>
      {/* <TableRow
        mb={"8px"}
        key={post._id}
        pb={"8px"}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Avatar
            src={`${post.avatar}`}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "5px",
              height: "150px",
              width: "200px",
            }}
            variant="rounded"
          />
        </TableCell>
        <TableCell align="left">
          <Box
            display="grid"
            gridColumn="span 10"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={3}
          >
            <Box gridColumn="span 12">
              <Typography
                className="title"
                variant="h5"
                display="block"
                gutterBottom
                sx={{ PointerEvent: "cursor" }}
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
          <ThumbUpIcon fontSize="small" />
          <br />
          {post.like}
        </TableCell>
        <TableCell align="center">
          <SmsIcon fontSize="small" />
          <br />
          {post.comment}
        </TableCell>
        {post.author === userId && (
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

        {post.author === userId && (
          <TableCell align="center">
            <Fab
              color="warning"
              aria-label="delete"
              size="small"
              onClick={() => handleClickOpen(post._id)}
            >
              <DeleteIcon />
            </Fab>
          </TableCell>
        )}
      </TableRow> */}
    </Box>
  );
}
