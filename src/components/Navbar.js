import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;

export default function Navbar() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {isLoggedIn && (
              <>
                <ListItem sx={{borderBottom:"1px solid #000"}}>
                  <ListItemButton onClick={() => navigate("/user/post/create")}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Post" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate(``);
                    }}
                  >
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Likes" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate(``);
                    }}
                  >
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
