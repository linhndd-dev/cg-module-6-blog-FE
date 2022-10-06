import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getPostsByGuest} from "../redux/apis";
import Loading from "./Loading";
import {useNavigate} from "react-router-dom";
// import Button from "@mui/material/Button";
import ReactReadMoreReadLess from "react-read-more-read-less";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';

const Img = styled('img')({
    margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%',
});


function Portfolio() {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    let {posts, status} = useSelector(state => state.post)
    console.log(posts);
    useEffect(() => {
        dispatch(getPostsByGuest());
    }, [dispatch]);

    const handleShowDetail = async (id) => {
        navigate(`/post/${id}`);
    };

    return (
        <section className="page-section portfolio" id="portfolio">
            <div className="container">
                <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Post</h2>
                <div className="divider-custom">
                    <div className="divider-custom-line"/>
                    <div className="divider-custom-icon"><i className="fas fa-star"/></div>
                    <div className="divider-custom-line"/>
                </div>
                <div className="row justify-content-center">
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        {posts && status === "loading" ? (
                            <Loading/>
                        ) : (
                            status === "successful" &&
                            posts.map((item) => (<Grid item xs={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            margin: 'auto',
                                            maxWidth: 500,
                                            flexGrow: 1,
                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <ButtonBase sx={{width: 128, height: 128}} onClick={() => handleShowDetail(item._id)}>
                                                    <Img src={item.avatar}/>
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <a  onClick={() => {
                                                            handleShowDetail(item._id)
                                                        }}>
                                                            <Typography gutterBottom variant="subtitle2"
                                                                        component="div">
                                                                {item.title}
                                                            </Typography>
                                                        </a>
                                                        <div>
                                                            <ReactReadMoreReadLess
                                                                charLimit={30}
                                                                readMoreText={"Chi tiết"}
                                                                readLessText={"Ẩn"}
                                                                readMoreClassName="read-more-less--more"
                                                                readLessClassName="read-more-less--less">
                                                                {/*<Typography variant="body2" gutterBottom>*/}
                                                                    {item.summary}
                                                                {/*</Typography>*/}
                                                            </ReactReadMoreReadLess>
                                                        </div>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.author.username}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" component="div" align="right">
                                                            <ThumbUpRoundedIcon color={'action'} fontSize={'small'}/>
                                                            <ChatBubbleRoundedIcon color={'action'} fontSize={'small'}/>
                                                            <ReplyRoundedIcon color={'action'} fontSize={'small'}/>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            )))}
                    </Grid>
                </div>
            </div>
        </section>

    )
}

export default Portfolio