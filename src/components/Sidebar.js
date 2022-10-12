import { Grid, ImageListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByGuest } from "../redux/apis";
import FavoritePosts from "./FavoritePosts";
import Members from "./Members";
import { purple, red, teal } from "@mui/material/colors";
const primary = teal[100];

export function Sidebar() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsByGuest());
  }, []);
  return (
      <>
      <Box sx={{ paddingBottom: "40px", lineHeight: "1.6" }}>
        <Typography fontWeight="bold" color="black" variant="h5" align="left">
          Favorite Posts
        </Typography>
        <hr />
        {posts.length > 0 &&
          status === "successful" &&
          posts.map((post, index) => {
            if (index < 3)
              return (
                <ImageListItem>
                  <FavoritePosts key={post._id} post={post} />
                </ImageListItem>
              );
          })}
      </Box>
      <Box
        sx={{ bgcolor: primary, borderRadius: "10px", marginBottom: "40px" }}
      >
        <Members />
        <Members />
        <Members />
        <Members />
      </Box>
      <Box sx={{ paddingBottom: "40px" }}>
        <Typography fontWeight="bold" color="black" variant="h5" align="left">
          Favorite Posts
        </Typography>
        <hr />
        {posts.length > 0 &&
          status === "successful" &&
          posts.map((post, index) => {
            if (index < 3)
              return (
                <ImageListItem>
                  <FavoritePosts key={post._id} post={post} />
                </ImageListItem>
              );
          })}
      </Box>
      </>
  );
}

