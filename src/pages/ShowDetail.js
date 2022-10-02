import {Box, Button, Fab, Grid, Pagination} from "@mui/material";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import * as React from 'react';
import Typography from '@mui/material/Typography';
function ShowDetail(){
    const navigate = useNavigate();
    let post = useSelector(state => state.posts.post)
    let content = post.content
    return (
        <Box md={5} width={'100%'} height={'100%'}>
            <Typography variant={'h3'} gutterBottom align={'center'}>
                {post.title}
            </Typography>
            <Grid container>
                <Grid item xs={4}>
                    <Typography variant={'body1'} paddingLeft={2} col={2}>
                        {post.author}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant={'body1'} color={'text.secondary'} align={'right'} paddingRight={2}>
                        {post.createdAt}
                    </Typography>
                </Grid>
            </Grid>
            <hr/>
            <Typography paddingLeft={2} paddingRight={2} align="justify" dangerouslySetInnerHTML={{__html: content}}></Typography>
        </Box>
    )
}

export default ShowDetail