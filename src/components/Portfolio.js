import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllMyPost} from "../redux/apis";
const Img = styled('img')({
    margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%',
});

function Portfolio() {
    const dispatch = useDispatch();
    let {posts} = useSelector(state => state.post)
    console.log(posts);
    useEffect(() => {
        dispatch(getAllMyPost());
    }, [dispatch]);
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
                        {posts.map((item) => (<Grid item xs={6}>
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
                                            <ButtonBase sx={{width: 128, height: 128}}>
                                                <Img src={item.avatar}/>
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle2" component="div">
                                                        {item.title}
                                                    </Typography>
                                                    <div >
                                                    <Typography variant="body2" gutterBottom >
                                                        {item.summary}
                                                    </Typography>
                                                    </div>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.author}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </section>

    )
}

export default Portfolio