import {Box, Button, Fab, Grid, Pagination} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { getDetailPost } from '../redux/apis';

function SinglePost(){
    const navigate = useNavigate();
  const dispatch = useDispatch();
  let {id} = useParams();
    
    let {post} = useSelector(state => state.post)
    console.log(post);
    useEffect(() => {
        dispatch(getDetailPost(id))
      },[])
    return (
        <Box md={5} width={'100%'} height={'100%'}>
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
            <Typography paddingLeft={2} paddingRight={2} align="justify" dangerouslySetInnerHTML={{__html: post.content}}></Typography>
        </Box>
    )
}

export default SinglePost;