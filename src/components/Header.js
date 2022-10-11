import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Avatar, CssBaseline, Divider, ListItemIcon, MenuList, Modal, Paper, Stack, Tooltip} from '@mui/material';
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import {logout} from '../redux/slices/authSlice';
import {Logout, PersonAdd, Settings} from '@mui/icons-material';
import {getMyNotification} from '../redux/slices/authSlice';
import {profileUser} from "../redux/apis";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../pages/firebase";

const StyledPaper = styled(Paper)(({theme}) => ({
    maxWidth: 400,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {isLoggedIn, notifications} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.user);
    const login = JSON.parse(localStorage.getItem("login"));
    const userId = login?.idUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (userId) {
            dispatch(profileUser(userId))
        }
    }, [])

    // console.log(notifications);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openP, setOpenP] = React.useState(false);
    const [update, setUpdate] = React.useState(false);
    const handleOpenP = () => {
        setOpenP(true);
    };
    const handleCloseP = () => {
        setOpenP(false);
    };
    const handleUpdate = () => {
        setUpdate(true)
    }
    const handleUpdateClose = () => {
        setUpdate(false)
    }

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
        dispatch(getMyNotification())
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
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            <MenuItem onClick={() => {
            }}>
                <Button onClick={handleOpenP}>My Profile</Button>
                <React.Fragment>
                    <Modal
                        hideBackdrop
                        open={openP}
                        // onClose={handleCloseP}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{...style, width: 500}}>
                            <h2 id={'parent-modal-title'}>Thông Tin Cá Nhân</h2>
                            <p id="parent-modal-description">
                                <strong>Name</strong>: {''}{user.username}
                            </p>
                            <p id="parent-modal-description">
                                <strong>FullName</strong>:{user.fullname}
                            </p>
                            <p id="parent-modal-description">
                                <strong>Address</strong>:{user.address}
                            </p>
                            <p id="parent-modal-description">
                                <strong>PhoneNumber</strong>:{user.phoneNumber}
                            </p>
                            <p id="parent-modal-description">
                                <strong>Email</strong>:{user.email}
                            </p>
                            {/*<UpdateUserModal/>*/}
                            <Button onClick={() =>{
                                navigate('/profile/update')
                            }}>Update</Button>
                            <Button onClick={handleClose}>BACK</Button>
                        </Box>
                    </Modal>
                </React.Fragment>
            </MenuItem>
            <MenuItem onClick={() => {
                navigate("/");
                dispatch(logout())
            }}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
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
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-30%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            <MenuItem border={"none"} noWrap>
                <StyledPaper>
                    {notifications && notifications.length > 0 && notifications.map((notification) =>
                        <Typography border={"none"} noWrap> {notification.message} </Typography>
                    )}

                </StyledPaper>
            </MenuItem>
            {/* <MenuItem onClick={() => {
        navigate("/");
        dispatch(logout())
        }}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem> */}
        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <CssBaseline/>
            <AppBar position="fixed" color='inherit' sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                        onClick={() => {
                            navigate("/")
                        }}
                        autoComplete
                    >
                        Blog
                    </Typography>
                    {isLoggedIn ? (
                        <Box sx={{paddingLeft: " 20px"}}>
                            <Button
                                id="demo-positioned-button"
                                aria-controls={openManagePost ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openManagePost ? 'true' : undefined}
                                onClick={handleClickManagePost}
                                sx={{color: "black"}}
                            >
                                Post Management
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorElManagePost}
                                open={openManagePost}
                                onClose={handleCloseManagePost}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={() => {
                                    navigate("/post/create");
                                    handleCloseManagePost();
                                }}>
                                    Create Post
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    navigate("/post/list");
                                    handleCloseManagePost();
                                }}>
                                    My Post
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : <></>}
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {isLoggedIn ? (
                            <>
                                {user.username}
                                <React.Fragment>
                                    <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                                        <Badge badgeContent={notifications.length} color="error">
                                            <IconButton
                                                onClick={handleClickNotification}
                                                size="small"
                                                sx={{ml: 2}}
                                                aria-controls={openNotification ? 'notification' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openNotification ? 'true' : undefined}
                                            >
                                                <NotificationsIcon/>
                                            </IconButton>
                                        </Badge>
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick}
                                                size="small"
                                                sx={{ml: 2}}
                                                aria-controls={open ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                            >
                                                <Avatar sx={{width: 32, height: 32}}>M</Avatar>
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
                                <Button variant="outlined" sx={{color: "black", border: "1px solid #cfd8dc"}}
                                        onClick={() => navigate('/login')}>Login</Button>
                                <Button variant="outlined" sx={{color: "black", border: "1px solid #cfd8dc"}}
                                        onClick={() => navigate('/register')}>Register</Button>
                            </Stack>
                        )}
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
//
// function UpdateUserModal() {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     }
//     let { user } = useSelector((state) => state.user)
//     let { id } = useParams();
//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//
//     const formik = useFormik({
//         initialValues: {
//             username: "",
//             fullName: "",
//             email: "",
//             phoneNumber: "",
//             address: "",
//         },
//         validationSchema: Yup.object({
//             fullName: Yup.string()
//                 .min(2,'Must be more than  2 characters')
//                 .max(15, 'Must be 15 characters or less')
//                 .required('Name is valid required!'),
//             email: Yup.string().email('Invalid email address').required('Email is valid required!'),
//             phoneNumber: Yup.number()
//                 .required('PhoneNumber is valid required!'),
//             address: Yup.string()
//                 .required('Address is valid required!')
//         }),
//         onSubmit: async (values, helpers) => {
//             console.log(values)
//             let imageUpload = image;
//             if (imageUpload) {
//                 const imageRef = ref(storage, `images/${imageUpload?.name}`);
//                 uploadBytes(imageRef, imageUpload).then((snapshot) => {
//                     getDownloadURL(snapshot.ref).then((url) => {
//                         console.log(url)
//                     });
//                 });
//             }
//
//         },
//     })
//
//     const [info, setInfo] = useState({})
//     const [image, setImage] = useState()
//     useEffect(() => {
//         return () => {
//             image && URL.revokeObjectURL(image?.preview)
//         }
//     }, [image])
//
//
//     const handlePreviewAvatar = (e) => {
//         const file = e.target.files[0]
//         file.preview = URL.createObjectURL(file)
//         setImage(file)
//
//     }
//     const handleChange = (e) => {
//         setInfo({
//             ...info,
//             [e.target.name]: e.target.value
//         })
//         console.log(e.target.value)
//     }
//
//     const handleUpdate = async (values) => {
//         await dispatch(updateProfile({ values, id }));
//         navigate("/profile");
//     }
//     return (
//         <React.Fragment>
//             <Button onClick={handleOpen}>Update</Button>
//             <Modal
//                 hideBackdrop
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="child-modal-title"
//                 aria-describedby="child-modal-description"
//             >
//                 <Box sx={{...style, width: 700}}>
//                     <h2 id="child-modal-title">Cập Nhật Thông Tin</h2>
//                     <div style={{display: "flex", flexDirection: "column"}}>
//                         <form onSubmit={formik.handleSubmit}>
//                             <div style={{display: "flex", flexDirection: "row"}}>
//                                 <div style={{margin: "7px 10px"}}>
//                                     <Avatar alt="Remy Sharp" src={image?.preview}
//                                             sx={{width: "100px", height: "100px", margin: "5px 5px"}}/>
//                                 </div>
//                                 <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
//                                     <label htmlFor="upload-photo">
//                                         <input
//                                             style={{display: "none"}}
//                                             id="upload-photo"
//                                             name="upload-photo"
//                                             type="file"
//                                             onChange={handlePreviewAvatar}
//                                         />
//                                         <br/>
//                                         <br/>
//                                         <Button style={{backgroundColor: "#1a1a1a"}} variant="contained" component="span">
//                                             Upload
//                                         </Button>{" "}
//                                     </label>
//                                 </div>
//                             </div>
//                             <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                                 <TextField
//                                     id="outlined-basic"
//                                     label="FullName"
//                                     variant="outlined"
//                                     name="fullName"
//                                     type="text"
//                                     onChange={formik.handleChange}
//                                     error={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ''}
//                                     helperText={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ''}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.fullName}
//                                 />
//                             </div>
//                             <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                                 <TextField
//                                     id="outlined-basic"
//                                     label="Email"
//                                     variant="outlined"
//                                     name="email"
//                                     type="text"
//                                     onChange={formik.handleChange}
//                                     error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
//                                     helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.email}
//                                 />
//                             </div>
//                             <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                                 <TextField
//                                     id="outlined-basic"
//                                     label="PhoneNumber"
//                                     variant="outlined"
//                                     name="phoneNumber"
//                                     type="number"
//                                     onChange={formik.handleChange}
//                                     error={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ''}
//                                     helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ''}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.phoneNumber}
//                                 />
//                             </div>
//
//                             <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                                 <TextField
//                                     id="outlined-basic" label="Address" variant="outlined"
//                                     name="address"
//                                     type="text"
//                                     onChange={formik.handleChange}
//                                     error={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
//                                     helperText={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.address}
//                                 />
//                             </div>
//                             <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                                 <Button variant="contained" style={{backgroundColor: "#1a1a1a"}} type="submit" onClick={handleUpdate
//                                 }>Update</Button>
//                             </div>
//                         </form>
//                     </div>
//                     <Button>Cập Nhật< /Button>
//                     {/*<Button onClick={handleClose}>Đóng</Button>*/}
//                 </Box>
//             </Modal>
//         </React.Fragment>
//     );
// }
