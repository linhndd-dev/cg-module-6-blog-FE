import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Container,
  CssBaseline,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  InputLabel,
  Pagination,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SmsIcon from "@mui/icons-material/Sms";
import Loading from "./Loading";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDetailPost } from "../redux/apis";
import React, { useEffect, useState } from "react";
import { deletePost } from "../redux/apis";
import IconButton from "@mui/material/IconButton";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { purple, red, teal } from '@mui/material/colors';
const primary = teal[100]

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  backgroundColor: "transparent",
  maxWidth: 300,
  gutterBottom: "true",
  variant: "subtitle1",
  align: "left",
  marginLeft: "10px",
  fontWeight:"400"
}));

export default function Members({ post }) {
  
  return (
    <>
      <Grid container spacing={2} sx={{paddingBottom:"16px"}} >
        <Grid item>
          <ButtonBase sx={{ width: 100, height: 50, margin:"8px 8 0"}} >
            <Img alt="complex" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" style={{ borderRadius: 10 }} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <StyledTypographyTitle align="justify" fontSize="16px" paddingRight="10px">
            Lê Tiến Dũng
          </StyledTypographyTitle>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{paddingBottom:"16px"}} >
        <Grid item>
          <ButtonBase sx={{ width: 100, height: 50, margin:"8px 8 0"}} >
            <Img alt="complex" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" style={{ borderRadius: 10 }} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <StyledTypographyTitle align="justify" fontSize="16px" paddingRight="10px">
            Nghiêm Văn Đông
          </StyledTypographyTitle>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{paddingBottom:"16px"}} >
        <Grid item>
          <ButtonBase sx={{ width: 100, height: 50, margin:"8px 8 0"}} >
            <Img alt="complex" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" style={{ borderRadius: 10 }}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <StyledTypographyTitle align="justify" fontSize="16px" paddingRight="10px">
            Nguyễn Doãn Duy Linh
          </StyledTypographyTitle>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{paddingBottom:"16px"}} >
        <Grid item>
          <ButtonBase sx={{ width: 100, height: 50, margin:"8px 8 0"}} >
            <Img alt="complex" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" style={{ borderRadius: 10 }}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <StyledTypographyTitle align="justify" fontSize="16px" paddingRight="10px">
            Nguyễn Tài
          </StyledTypographyTitle>
        </Grid>
      </Grid>
    </>
  );
}
