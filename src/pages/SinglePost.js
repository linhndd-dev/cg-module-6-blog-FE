import {
  Box,
  Button,
  Fab,
  Grid,
  Pagination,
  Avatar,
  ButtonBase,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { addComment, getDetailPost } from "../redux/apis";
import { getComments } from "../redux/apis";
import Comment from "../components/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

function SinglePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();
  const login = JSON.parse(localStorage.getItem("login"));
  const userId = login?.idUser;
  let { post, comments, commentStatus } = useSelector((state) => state.post);
  const day = new Date(post.createdAt);
  useEffect(() => {
    dispatch(getDetailPost(id));
    dispatch(getComments(id));
  }, [id]);
  const handleAddComment = async () => {
    const response = await addComment(
      { postId: id, userId: userId, text: commentText },
      id
    );
    if (response) {
      dispatch(getComments(id));
      setCommentText("");
    }
  };
  return (
    <Box sx={{ bgcolor: "white", position: "relative" }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ position: "absolute", left: "0" }}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        onClick={() => navigate(+1)}
        sx={{ position: "absolute", right: "0" }}
      >
        <ArrowForwardIcon />
      </IconButton>
      <Box className={"container"} sx={{ bgcolor: "white" }}>
        <Box paddingTop={5} md={5} width={"100%"} height={"100%"}>
          <Typography
            variant={"h1"}
            sx={{ color: "black", fontWeight: "bold", fontSize: "28px" }}
            gutterBottom
            align={"left"}
          >
            {post.title}
          </Typography>
          <Typography variant={"body1"} align="left">
            {day.toLocaleDateString()}
          </Typography>
          <hr />
          <Typography
            paddingLeft={2}
            paddingRight={2}
            align="justify"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></Typography>
        </Box>
      </Box>
      <br />
      <div className={"container"} style={{ textAlign: "left" }}>
        <Box>
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Write your comment here..."
            style={{ width: "100%", height: "150px" }}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            disabled={commentText.length === 0}
            onClick={handleAddComment}
          >
            Send Comment
          </Button>
        </Box>
      </div>
      <br />
      <h5 style={{ textAlign: "left" }}>Comment(s)</h5>
      <div className={"container"}>
        <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
        </Box>
      </div>
    </Box>
  );
}

export default SinglePost;
