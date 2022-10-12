import {profileUser} from "../../redux/apis";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import {Avatar, Grid} from "@mui/material";
import {Box} from "@mui/system";
import './style.module.css'
import Button from "@mui/material/Button";

export default function Profile() {
    // const [percent, setPercent] = useState(0);
    // const [file, setFile] = useState("");
    const {user} = useSelector((state) => state.auth);
    const login = JSON.parse(localStorage.getItem("login"));
    const userId = login?.idUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(user)
    useEffect(() => {
        dispatch(profileUser(userId))
    }, [])
    return (
        <div className={'container'} style={{background: 'white'}}>
            <div className={'container'}>
                <h1>Thông Tin Cá Nhân</h1>
                <Box>
                    <Grid sx={{flexGrow: 1}} container spacing={8}>
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item >
                                    <Avatar
                                        sx={{
                                            height: 300,
                                            width: 300,
                                            margin: 2,
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                        }}
                                        src={user.avatar}
                                    />
                                </Grid>
                                <Grid item align="left" sx={{marginTop: 10}}>
                                    <Typography variant={'p'} sx={{fontSize: '1rem'}} gutterBottom>
                                        <strong>Username:</strong> {user.username}
                                    </Typography>
                                    <br/>
                                     <Typography variant={'p'} sx={{fontSize: '1rem'}} gutterBottom>
                                        <strong>Fullname:</strong> {user.fullname}
                                    </Typography>
                                    <br/>
                                     <Typography variant={'p'} sx={{fontSize: '1rem'}} gutterBottom>
                                        <strong>{'Email'}:</strong> {user.email}
                                    </Typography>
                                    <br/>
                                     <Typography variant={'p'} sx={{fontSize: '1rem'}} gutterBottom>
                                        <strong>{'Phonenumber'}:</strong> {user.phoneNumber}
                                    </Typography>
                                    <br/>
                                     <Typography variant={'p'} sx={{fontSize: '1rem'}} gutterBottom>
                                        <strong>{'Address'}:</strong> {user.address}
                                    </Typography>
                                    <br/>
                                    <Button  variant="contained" color="primary" sx={{marginRight: 2, marginTop:2}} onClick={() => {
                                        navigate('/user/profile/changeinfo')
                                    }}>Cập Nhật Thông Tin
                                    </Button>
                                    <Button  variant="contained" color="primary" sx={{marginRight: 2, marginTop:2}} onClick={() => {
                                        navigate('/profile/password')
                                    }}>Đổi Mật Khẩu</Button>
                                    <Button  variant="contained" color="primary"  sx={{marginRight: 2, marginTop:2}} onClick={() => {
                                        navigate('/')
                                    }}>Quay Lại
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}