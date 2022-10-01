import { Box, Button, Fab, Pagination } from "@mui/material";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom"
import {getAllMyPost, getDetailPost} from "../redux/apis";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
// import ListItemTitle from '@mui/material/ListItemTitle';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from "axios";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Stack } from "@mui/system";
// import ShowDetail from "./ListPost";
function ShowDetail(){
    let {id} = useParams()
    console.log(id)
    let dispatch = useDispatch()
    const navigate = useNavigate();
    const posts = useSelector(state => state.posts.posts)
    console.log(posts)
    useEffect(() => {
        dispatch(getDetailPost())
    },[])
    return (
        <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
            <h2 align={'center'}>{posts.title}</h2>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemText>
                        {posts.title}
                    </ListItemText>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {posts.author}
                                </Typography>
                                {/*{Time}*/}
                                <Typography>
                                    {posts.content}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                {/*<Divider variant="inset" component="li" />*/}
                {/*<ListItem alignItems="flex-start">*/}
                {/*    <ListItemAvatar>*/}
                {/*        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />*/}
                {/*    </ListItemAvatar>*/}
                {/*    <ListItemText*/}
                {/*        primary="Summer BBQ"*/}
                {/*        secondary={*/}
                {/*            <React.Fragment>*/}
                {/*                <Typography*/}
                {/*                    sx={{ display: 'inline' }}*/}
                {/*                    component="span"*/}
                {/*                    variant="body2"*/}
                {/*                    color="text.primary"*/}
                {/*                >*/}
                {/*                    to Scott, Alex, Jennifer*/}
                {/*                </Typography>*/}
                {/*                {" — Wish I could come, but I'm out of town this…"}*/}
                {/*            </React.Fragment>*/}
                {/*        }*/}
                {/*    />*/}
                {/*</ListItem>*/}
                {/*<Divider variant="inset" component="li" />*/}
                {/*<ListItem alignItems="flex-start">*/}
                {/*    <ListItemAvatar>*/}
                {/*        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />*/}
                {/*    </ListItemAvatar>*/}
                {/*    <ListItemText*/}
                {/*        primary="Oui Oui"*/}
                {/*        secondary={*/}
                {/*            <React.Fragment>*/}
                {/*                <Typography*/}
                {/*                    sx={{ display: 'inline' }}*/}
                {/*                    component="span"*/}
                {/*                    variant="body2"*/}
                {/*                    color="text.primary"*/}
                {/*                >*/}
                {/*                    Sandra Adams*/}
                {/*                </Typography>*/}
                {/*                {' — Do you have Paris recommendations? Have you ever…'}*/}
                {/*            </React.Fragment>*/}
                {/*        }*/}
                    {/*/>*/}
                {/*</ListItem>*/}
            </List>

            {/*<TableContainer component={Paper}>*/}
            {/*    <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
            {/*        <TableHead>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell>Avatar</TableCell>*/}
            {/*                <TableCell align="right">Title</TableCell>*/}
            {/*                <TableCell align="right">Summary</TableCell>*/}
            {/*                <TableCell align="right">Like</TableCell>*/}
            {/*                <TableCell align="right">Comment</TableCell>*/}
            {/*                <TableCell align="center" colSpan={2}>Comment</TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            {posts.map((row) => (*/}
            {/*                <TableRow*/}
            {/*                    key={row._id}*/}
            {/*                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
            {/*                >*/}
            {/*                    <TableCell component="th" scope="row">*/}
            {/*                        <img style={{width: "50px"}}*/}
            {/*                             src={`${row.avatar}`}*/}
            {/*                        />*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell align="right">{row.title}</TableCell>*/}
            {/*                    <TableCell align="right">{row.summary}</TableCell>*/}
            {/*                    <TableCell align="right">{row.like}</TableCell>*/}
            {/*                    <TableCell align="right">{row.comment}</TableCell>*/}
            {/*                    <TableCell align="center">*/}
            {/*                        <Fab color="primary" aria-label="edit">*/}
            {/*                            <EditIcon />*/}
            {/*                        </Fab>*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell align="center">*/}
            {/*                        <Fab color="warning" aria-label="showdetail">*/}
            {/*                            /!*<Link to={'/showdetail'} element={<ShowDetail/>}><InsertDriveFileIcon /></Link>*!/*/}
            {/*                        </Fab>*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell align="center">*/}
            {/*                        <Fab color="secondary" aria-label="delete">*/}
            {/*                            <DeleteIcon />*/}
            {/*                        </Fab>*/}
            {/*                    </TableCell>*/}
            {/*                </TableRow>*/}
            {/*            ))}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}
            {/*<Stack spacing={2}>*/}
            {/*    <Pagination count={10} color="primary" onChange={handleChangePage}/>*/}
            {/*</Stack>*/}
        </Box>
    )
}

export default ShowDetail