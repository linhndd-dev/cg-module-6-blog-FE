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

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  maxWidth: 400,
}));

const Img = styled('img')({
  margin: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function PostHome({ post }) {
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
    <>
            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 450,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src={`${post.item.avatar}`} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {post.item.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        123
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.item._id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ cursor: 'pointer' }} variant="body2">
                        {post.item.createdAt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
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
    </>
  );
}
