import {
  Box,
  Button,
  Fab,
  Grid,
  Pagination,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Input,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { deleteComment } from "../redux/apis";
import { getComments } from "../redux/apis";
import { useDispatch, useSelector } from "react-redux";
import ModalComment from "./ModalComment";
import { editComment } from "../redux/apis";
import Swal from "sweetalert2";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

export default function Comment({ comment }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const login = JSON.parse(localStorage.getItem("login"));
  const userId = login?.idUser;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [commentText, setCommentText] = useState(comment.text);
  const time = new Date(comment.createdAt);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteComment = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteComment(comment._id);
        if (response) {
          dispatch(getComments(id));
        }
      }
    });
  };
  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleEditComment = async () => {
    const response = await editComment(
      {
        postId: comment.postId,
        text: commentText,
        userId: comment.userId,
      },
      comment._id
    );
    if (response) {
      dispatch(getComments(id));
    }
  };
  return (
    <>
      <StyledPaper
        sx={{
          my: 1,
          p: 2,
          textAlign: "left",
          
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar src={comment.userId.avatar} />
          </Grid>
          <Grid item xs>
            <Typography sx={{ fontWeight: "bold", marginRight: "0px" }}>
              {comment.userId.username} -
              <i
                style={{ opacity: "0.4", fontSize: "12px", marginRight: "0px" }}
              >
                {time.toLocaleString()}
              </i>
            </Typography>
            <hr style={{ opacity: "0.1", margin: "2px 0" }} />
            <Typography>{'"' + comment.text + '"'}</Typography>
          </Grid>
          <Grid item>
            {comment.userId._id === userId && (
              <IconButton
                aria-expanded={open ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(e);
                }}
              >
                <MoreHorizIcon />
              </IconButton>
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={(e) => e.stopPropagation()}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleModalOpen}>Edit Comment</MenuItem>
              <MenuItem onClick={(e) => handleDeleteComment(e)}>
                Delete Comment
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </StyledPaper>
      {openModal && (
        <ModalComment
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Comment"}
          len={commentText.trimStart().length}
          handleSave={handleEditComment}
        >
          <Box>
            <Grid container>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Post your comment"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ModalComment>
      )}
    </>
  );
}
