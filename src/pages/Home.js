import React, {useEffect} from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import MenuIcon from '@mui/icons-material/Menu';
import StarBorder from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FacebookIcon from '@mui/icons-material/Facebook';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ImageList from '@mui/material/ImageList';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import {ButtonBase, Collapse, Grid, ListSubheader} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import LoginIcon from '@mui/icons-material/Login';
import {Link} from 'react-router-dom'
import Login from './Login/Login'
import styled from "styled-components";
import * as PropTypes from "prop-types";
import Post from "./Post";
import {useDispatch, useSelector} from 'react-redux'
import { getAllMyPost } from '../redux/apis'

const NavUnlisted = styled.ul`
  text-decoration: none;
  flex-grow: 0.5;
  align-items: end;
`;

const StyledLink = styled(Link)`
  color: White;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function Home() {

    const dispatch = useDispatch()

    let {posts} = useSelector((data) => data.posts)

    console.log(posts)

    useEffect(() => {
        dispatch(getAllMyPost())
    }, [])

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <Typography variant="h5" align={'left'} sx={{flexGrow: 0.5}}>BLOG</Typography>
                    <TextField
                        sx={{m: 1}}
                        paddingright={15}
                        id="search"
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <Button variant="outline" color="error">Search</Button>
                    <NavUnlisted>
                        <StyledLink>
                            <HomeIcon></HomeIcon>
                        </StyledLink>
                        <StyledLink to='/post' element={<Post/>}>
                            <NoteAddIcon></NoteAddIcon>
                        </StyledLink>
                        <StyledLink to='/login' element={<Login/>}>
                            <LoginIcon></LoginIcon>
                        </StyledLink>
                    </NavUnlisted>
                </Toolbar>
            </AppBar>

            <Box paddingTop={5} sx={{width: '100%'}}>
                {posts?.map((item) => (
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        <Paper
                            sx={{
                                //vien
                                p: 2,
                                margin: 'auto',
                                maxWidth: 300,
                                flexGrow: 1,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase sx={{width: 128, height: 128}}>
                                        {/*<Img alt="complex" src="../../public/Screenshot from 2022-08-04 11-17-24.png"/>*/}
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {item.avatar}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.summary}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{cursor: 'pointer'}} variant="body2">
                                                {item.author}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div">
                                            {item.summary}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item>*/}
                            {/*        <ButtonBase sx={{width: 128, height: 128}}>*/}
                            {/*            <Img alt="complex" src='../../public/Screenshot from 2022-08-04 11-17-24.png'/>*/}
                            {/*        </ButtonBase>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={12} sm container>*/}
                            {/*        <Grid item xs container direction="column" spacing={2}>*/}
                            {/*            <Grid item xs>*/}
                            {/*                <Typography gutterBottom variant="subtitle1" component="div">*/}
                            {/*                    Standard license*/}
                            {/*                </Typography>*/}
                            {/*                <Typography variant="body2" gutterBottom>*/}
                            {/*                    Full resolution 1920x1080 • JPEG*/}
                            {/*                </Typography>*/}
                            {/*                <Typography variant="body2" color="text.secondary">*/}
                            {/*                    ID: 1030114*/}
                            {/*                </Typography>*/}
                            {/*            </Grid>*/}
                            {/*            <Grid item>*/}
                            {/*                <Typography sx={{cursor: 'pointer'}} variant="body2">*/}
                            {/*                    Remove*/}
                            {/*                </Typography>*/}
                            {/*            </Grid>*/}
                            {/*        </Grid>*/}
                            {/*        <Grid item>*/}
                            {/*            <Typography variant="subtitle1" component="div">*/}
                            {/*                $19.00*/}
                            {/*            </Typography>*/}
                            {/*        </Grid>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </Paper>
                    </Grid>
                ))}

                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 300,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{width: 128, height: 128}}>
                                {/*<Img alt="complex" src="../../public/Screenshot from 2022-08-04 11-17-24.png"/>*/}
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        Standard license
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Full resolution 1920x1080 • JPEG
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ID: 1030114
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{cursor: 'pointer'}} variant="body2">
                                        Remove
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" component="div">
                                    $19.00
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{width: 128, height: 128}}>
                                {/*<Img alt="complex" src='../../public/Screenshot from 2022-08-04 11-17-24.png'/>*/}
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        Standard license
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Full resolution 1920x1080 • JPEG
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ID: 1030114
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{cursor: 'pointer'}} variant="body2">
                                        Remove
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" component="div">
                                    $19.00
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{width: 128, height: 128}}>
                                {/*<Img alt="complex" src='../../public/Screenshot from 2022-08-04 11-17-24.png'/>*/}
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        Standard license
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Full resolution 1920x1080 • JPEG
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ID: 1030114
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{cursor: 'pointer'}} variant="body2">
                                        Remove
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" component="div">
                                    $19.00
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                {/*</Grid>*/}
            </Box>
        </div>
    )
}

export default Home