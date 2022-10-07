import {Box, Button, Fab, Grid, Pagination} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Typography from '@mui/material/Typography';
import {getDetailPost} from '../redux/apis';

function SinglePost() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams();

    let {post} = useSelector(state => state.post)
    console.log(post);
    useEffect(() => {
        dispatch(getDetailPost(id))
    }, [])
    return (
        <div  className={'container'} style={{background:'white'}}>
            <div className={'container'} >
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
            {/*</div>*/}
            {/*<br/>*/}
            {/*<div className={'container'}>*/}
            {/*    <TextareaAutosize*/}
            {/*        maxRows={4}*/}
            {/*        aria-label="maximum height"*/}
            {/*        placeholder="Viết bình luận của bạn ở đây"*/}
            {/*        style={{ width: '100%', height:'150px' }}*/}
            {/*    />*/}
            {/*    <br/>*/}
            {/*    <Button variant="contained">*/}
            {/*        Gửi bình luận*/}
            {/*    </Button>*/}
            {/*</div>*/}
            {/*<h5>Bình luận</h5>*/}
            {/*<div className={'container'}>*/}

            </div>
        </div>
    )
}

export default SinglePost;