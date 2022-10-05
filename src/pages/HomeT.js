import * as React from 'react'
import NavbarT from "../components/NavbarT";
import Box from '@mui/material/Box'
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";

function HomeT() {
    return (
        <Box>
            <NavbarT></NavbarT>
            <Portfolio></Portfolio>
            <Footer></Footer>
        </Box>
    )
}

export default HomeT