import { Box, Button, Fab, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getUsersFromAdmin, deleteUserFromAdmin } from "../../redux/adminApi";
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
import { searchUsersByUsername } from "../../redux/adminApi";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export default function AdminUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const { users, status } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchUsersByUsername(search));
      navigate(`/admin/users/search?searchQuery=${search}`);
      // setSearch("");
    } else {
      dispatch(getUsersFromAdmin());
    }
  };
  console.log(search);
  const handleDeleteUser = async (id) => {
    await dispatch(deleteUserFromAdmin(id));
    handleClose();
  };

  const handleClickOpen = (id) => {
    // setUserId(id);
    // setOpen(true);
  };
  const handleClose = () => {
    // setOpen(false);
  };
  useEffect(() => {
    dispatch(getUsersFromAdmin());
  }, []);

  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
      <h2>USER MANAGEMENT</h2>
      <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <label>Search users by username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search Users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              
            </div>
          </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h3>USERNAME</h3>
              </TableCell>
              <TableCell align="center">
                <h3>CREATED AT</h3>
              </TableCell>
              <TableCell align="center">
                <h3>AVATAR</h3>
              </TableCell>
              <TableCell align="center">
                <h3>FULLNAME</h3>
              </TableCell>
              <TableCell align="center">
                <h3>STATUS</h3>
              </TableCell>
              <TableCell align="center">
                <h3>ACTIONS</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 &&
              status === "successful" &&
              users.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.createdAt}</TableCell>
                  <TableCell component="th" scope="row">
                    <img style={{ width: "100px" }} src={`${row.avatar}`} />
                  </TableCell>
                  <TableCell align="left">{row.fullname}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <Fab
                      color="warning"
                      aria-label="delete"
                      onClick={() => handleClickOpen(row._id)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleDeleteUser(userId)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={2}>
        {users.length === 0 && status === "successful" && (
          <p>There is no user!</p>
        )}
      </Stack>
    </Box>
  );
}
