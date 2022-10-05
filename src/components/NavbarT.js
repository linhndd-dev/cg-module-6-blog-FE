import * as React from "react";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from "@mui/material/IconButton";
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";

function NavbarT() {

    const navigate = useNavigate()

    const handleLogin = () =>{
        navigate('/login')
    }

    return (
            <AppBar color={'inherit'}>
                <Toolbar style={{
                    display:'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h3" paddingLeft={2} color="inherit">BLOG</Typography>
                    <div>
                    <IconButton aria-label="login" size="large" color="inherit" onClick={handleLogin}>
                        <LoginIcon fontSize="inherit" />Login
                    </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
    )
}

export default NavbarT