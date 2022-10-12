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
    const {user} = useSelector((state) => state.user);
    const login = JSON.parse(localStorage.getItem("login"));
    const userId = login?._id;
    console.log(userId)
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
                <hr/>
                <Box>
                    <Grid sx={{flexGrow: 1}} container spacing={8}>
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item>
                                    <Avatar
                                        sx={{
                                            height: 400,
                                            width: 400,
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                        }}
                                        src={user.avatar}
                                    />
                                </Grid>
                                <Grid item align="left">
                                    <Typography variant={'h4'} gutterBottom>
                                        <strong>UserName :</strong> {user.username}
                                    </Typography>
                                    <br/>
                                    <Typography variant={'h4'} gutterBottom>
                                        <strong>FullName :</strong> {user.fullname}
                                    </Typography>
                                    <br/>
                                    <Typography variant={'h4'} gutterBottom>
                                        <strong>{'Email'} :</strong> {user.email}
                                    </Typography>
                                    <br/>
                                    <Typography variant={'h4'} gutterBottom>
                                        <strong>{'PhoneNumber'} :</strong> {user.phoneNumber}
                                    </Typography>
                                    <br/>
                                    <Typography variant={'h4'} gutterBottom>
                                        <strong>{'Address'} :</strong> {user.address}
                                    </Typography>
                                    <br/>
                                    <Button onClick={() => {
                                        navigate('/user/profile/changeinfo')
                                    }}>Cập Nhật Thông Tin
                                    </Button>
                                    <Button onClick={() => {
                                        navigate('/profile/password')
                                    }}>Đổi Mật Khẩu</Button>
                                    <Button onClick={() => {
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