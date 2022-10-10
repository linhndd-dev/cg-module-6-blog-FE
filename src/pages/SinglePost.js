import { Box, Button, Fab, Grid, Pagination, Avatar } from "@mui/material";
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
  useEffect(() => {
    dispatch(getDetailPost(id));
    dispatch(getComments(id))
  }, []);
  console.log(comments);
  const handleAddComment = async () => {
    const response = await addComment({postId:id ,userId:userId, text: commentText},id)
    if (response) {
      dispatch(getComments(id));
      setCommentText("");
    }
  }
  return (
    <div className={"container"} style={{ background: "white" }}>
      <div className={"container"}>
        <Box paddingTop={5} md={5} width={"100%"} height={"100%"}>
          <Typography variant={"h3"} gutterBottom align={"center"}>
            {post.title}
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant={"body1"} paddingLeft={2} col={2}>
                {post.author.username}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant={"body1"}
                color={"text.secondary"}
                align={"right"}
                paddingRight={2}
              >
                {post.createdAt}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Typography
            paddingLeft={2}
            paddingRight={2}
            align="justify"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></Typography>
        </Box>
      </div>
      <br />
      <div className={"container"}>
        <TextareaAutosize
          maxRows={4}
          aria-label="maximum height"
          placeholder="Write your comment here..."
          style={{ width: "100%", height: "150px" }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <br />
        <Button 
          variant="contained"
          disabled={commentText.length === 0}
          onClick={handleAddComment}
        >
          Send Comment
        </Button>
      </div>
      <br />
      <h5>Comment(s)</h5>
      <div className={"container"}>
        <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
        {comments && 
                  comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))}
        </Box>
      </div>
    </div>
  );
}

export default SinglePost;
