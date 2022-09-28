import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Post(){
    return (
        <Box>
            <Box sx={{display: "fixed"}}>
                <Header/>
            </Box>
            <Toolbar />
            <Box sx={{display: "flex"}}>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </Box>
        </Box>
    )
}