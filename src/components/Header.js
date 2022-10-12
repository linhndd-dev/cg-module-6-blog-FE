import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  CssBaseline,
  Divider,
  ListItemIcon,
  MenuList,
  Paper,
  Stack,
  Tooltip,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { logout } from "../redux/slices/authSlice";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { getMyNotification } from "../redux/slices/authSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));
export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isLoggedIn, user, notifications } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElManagePost, setAnchorElManagePost] = React.useState(null);
  const openManagePost = Boolean(anchorElManagePost);
  const handleClickManagePost = (event) => {
    setAnchorElManagePost(event.currentTarget);
  };
  const handleCloseManagePost = () => {
    setAnchorElManagePost(null);
  };

  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const openNotification = Boolean(anchorElNotification);
  const handleClickNotification = (event) => {
    dispatch(getMyNotification());
    setAnchorElNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          navigate("/user/profile");
        }}
      >
        <Avatar />
        My Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/");
          dispatch(logout());
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderNotification = (
    <Menu
      anchorEl={anchorElNotification}
      id="notification"
      open={openNotification}
      onClose={handleCloseNotification}
      onClick={handleCloseNotification}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-30%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <Box>
          {notifications &&
            notifications.length > 0 &&
            notifications.map((notification) => (
              <MenuItem onClick={handleClose} noWrap>
                <StyledPaper
                  sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                  }}
                >
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography>{" "}{notification.message}{" "}</Typography>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </MenuItem>
            ))}
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <img
            onClick={() => navigate("/")}
            width="90px"
            height="74px"
            src="https://firebasestorage.googleapis.com/v0/b/image-blog-dbb1d.appspot.com/o/files%2Flogo-blog-13.png?alt=media&token=7da77104-fae0-423e-a670-20482a33b5c6"
          />
          {isLoggedIn ? (
            <Box sx={{ paddingLeft: " 20px" }}>
              <Button
                id="demo-positioned-button"
                onClick={() => navigate("/user/post/list")}
                sx={{ color: "black" }}
              >
                MyPost
              </Button>
            </Box>
          ) : (
            <></>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isLoggedIn ? (
              <>
                <React.Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Badge badgeContent={notifications.length} color="error">
                      <IconButton
                        onClick={handleClickNotification}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={
                          openNotification ? "notification" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openNotification ? "true" : undefined}
                      >
                        <NotificationsIcon />
                      </IconButton>
                    </Badge>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar
                          sx={{ width: 50, height: 50 }}
                          src={`${user.avatar}`}
                        >
                          {!user.avatar ? "" : user.fullname}{" "}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {renderNotification}
                  {renderMenu}
                </React.Fragment>

                {/* <Button variant="contained" color='error' onClick={() => {
                navigate('/')
                dispatch(logout())
              }}>Logout</Button> */}
              </>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{ color: "black", border: "1px solid #cfd8dc" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "black", border: "1px solid #cfd8dc" }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
