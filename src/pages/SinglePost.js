import {Avatar, Box, Button, Fab, Grid, Pagination} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getDetailPost} from '../redux/apis';

const StyledPaper = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

function SinglePost() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams();

    let {post} = useSelector(state => state.post)
    // console.log(post);
    useEffect(() => {
        dispatch(getDetailPost(id))
    }, [])
    return (
        <div className={'container'} style={{background: 'white'}}>
            <div className={'container'}>
                <Box paddingTop={5} md={5} width={'100%'} height={'100%'}>
                    <Typography variant={'h3'} gutterBottom align={'center'}>
                        {post.title}
                    </Typography>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant={'body1'} paddingLeft={2} col={2}>
                                {post.author.username}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant={'body1'} color={'text.secondary'} align={'right'} paddingRight={2}>
                                {post.createdAt}
                            </Typography>
                        </Grid>
                    </Grid>
                    <hr/>
                    <Typography paddingLeft={2} paddingRight={2} align="justify"
                                dangerouslySetInnerHTML={{__html: post.content}}></Typography>
                </Box>
            </div>
            <br/>
            <div className={'container'}>
                <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Viết bình luận của bạn ở đây"
                    style={{width: '100%', height: '150px'}}
                />
                <br/>
                <Button variant="contained">
                    Gửi bình luận
                </Button>
            </div>
            <br/>
            <h2>Bình luận</h2>
            <div className={'container'}>
                <Box sx={{ flexGrow: 1 , overflow: 'hidden', px: 3}} >
                    <StyledPaper
                        sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                        }}
                        style={{marginLeft: '0px'}}
                    >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar>W</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography>{'co qq'}</Typography>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                    <StyledPaper
                        sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                        }}
                        style={{marginLeft: '0px'}}
                    >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar>W</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography>{'dep'}</Typography>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                    <StyledPaper
                        sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                        }}
                        style={{marginLeft: '0px'}}
                    >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar>W</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography>{'10 diem'}</Typography>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Box>
            </div>
        </div>
    )
}

export default SinglePost;