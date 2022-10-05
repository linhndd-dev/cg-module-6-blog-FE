import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AdminNavbar from "../components/AdminNavbar";

export default function Layout() {
  return (
    <Box>
      <Box sx={{ display: "fixed" }}>
        <Header />
      </Box>
      <Toolbar />
      <Box sx={{ display: "flex" }}>
        <AdminNavbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
