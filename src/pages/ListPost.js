import { Box, Button, Fab, Pagination } from "@mui/material";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getAllMyPost, getDetailPost } from "../redux/apis";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from "@mui/system";
import ShowDetail from "./ShowDetail";

export default function ListPost(){
    const navigate = useNavigate();
    const dispath = useDispatch();
    useEffect(() => {
        dispath(getAllMyPost());
    },[])
    let posts = useSelector(state => state.posts.posts);
    const [page, setPage] = useState(1);
    const handleChangePage = (event, value) => {
        setPage(value);
    }
    const handleEditPost = async (id) => {
        await dispath(getDetailPost(id));
        navigate(`/post/edit/${id}`)
    }
    const handleShowDetail = async (id) => {
        await dispath(getDetailPost(id))
        navigate(`/post/${id}`)
    }
    return (
        <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
            <h2>List Post</h2>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Avatar</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Summary</TableCell>
                    <TableCell align="right">Like</TableCell>
                    <TableCell align="right">Comment</TableCell>
                    <TableCell align="center" colSpan={2}>Comment</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {posts.map((row) => (
                    <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <img style={{width: "50px"}}
                            src={`${row.avatar}`}
                        />
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.summary}</TableCell>
                    <TableCell align="right">{row.like}</TableCell>
                    <TableCell align="right">{row.comment}</TableCell>
                    <TableCell align="center">
                        <Fab color="primary" aria-label="edit" onClick={() => handleEditPost(row._id)}>
                            <EditIcon />
                        </Fab>
                    </TableCell>
                        <TableCell align="center">
                        <Fab color="warning" aria-label="showdetail" onClick={() => handleShowDetail(row._id)}>
                            <EditIcon />
                        </Fab>
                    </TableCell>
                    <TableCell align="center">
                        <Fab color="secondary" aria-label="delete">
                            <DeleteIcon />
                        </Fab>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination count={10} color="primary" onChange={handleChangePage}/>
            </Stack>
        </Box>
    )
}