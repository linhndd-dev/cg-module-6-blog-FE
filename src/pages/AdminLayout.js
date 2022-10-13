import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import HeaderAdmin from "../components/HeaderAdmin";

export default function Layout() {
  return (
    <Box>
      <Box sx={{ display: "fixed" }}>
        <HeaderAdmin />
      </Box>
      <Toolbar />
      <Box sx={{ display: "flex" }}>
        <AdminNavbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
