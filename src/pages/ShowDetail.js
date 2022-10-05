import {Box, Button, Fab, Grid, Pagination} from "@mui/material";
import TextField from '@mui/material/TextField';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import * as React from 'react';
import Typography from '@mui/material/Typography';
function ShowDetail(){
    const navigate = useNavigate();
    let post = useSelector(state => state.posts.post)
    let content = post.content
    return (
        <Box md={5} width={'100%'} height={'100%'}>
            component="form"
            sx={{
            '& .MuiTextField-root': {m: 1, width: '25ch'},
        }}
            noValidate
            autoComplete="off"
            >
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
            <Typography paddingLeft={2} paddingRight={2} align="justify"
                        dangerouslySetInnerHTML={{__html: content}}></Typography>
            <hr/>
            <Typography>Comment</Typography>
            <TextField id="outlined-search" label="Search field" type="search"/>
            <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                helperText="Some important text"
            />
            <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue="Hello World"
                variant="filled"
            />
        </Box>


    )
}

export default ShowDetail