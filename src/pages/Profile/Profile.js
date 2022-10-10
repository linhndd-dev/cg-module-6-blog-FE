import { profileUser} from "../../redux/apis";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {Container, CssBaseline, Grid} from "@mui/material";
import {Box} from "@mui/system";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../firebase";
import {Editor} from "@tinymce/tinymce-react";
import './style.module.css'
import Button from "@mui/material/Button";

export default function Profile() {
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {id} = useParams

    let user = useSelector(state => state.user.users)
    console.log(user)
    useEffect(() => {
        dispatch(profileUser(id))
    }, [])

    const handleChangeFileBase = (event) => {
        setFile(event.target.files[0]);
    };
    const handleUpdateProfile = async (values) => {
        await dispatch(profileUser({ values, id }));
        navigate("/post/list");
    };


    return (
        <div className={'container'} style={{background:'white'}}>
            <div className={'container'} >
                <Box paddingTop={5} md={5} width={'100%'} height={'100%'}>
                    <Typography variant={'h3'} gutterBottom align={'center'}>
                        {/*{post.title}*/}
                    </Typography>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant={'body1'} paddingLeft={2} col={2}>
                                {/*{post.author.username}*/}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant={'body1'} color={'text.secondary'} align={'right'} paddingRight={2}>
                                {/*{post.createdAt}*/}
                            </Typography>
                        </Grid>
                    </Grid>
                    <hr/>
                    {/*<Typography paddingLeft={2} paddingRight={2} align="justify"*/}
                    {/*            dangerouslySetInnerHTML={{__html: post.content}}></Typography>*/}
                </Box>
            </div>
            <br/>
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
            {/*<br/>*/}
            {/*<h3>Bình luận</h3>*/}
            {/*<div className={'container'}>*/}

            {/*</div>*/}
            <Button onClick={() =>{
                navigate('/updateProfile')
            }}>Update</Button>
        </div>


    )
}