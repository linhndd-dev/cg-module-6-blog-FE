import {
  Box,
  Button,
  Fab,
  Pagination,
  TextField,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getUsersFromAdmin,
  changeUserStatusFromAdmin,
} from "../../redux/adminApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import { searchUsersByUsername } from "../../redux/adminApi";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function AdminUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(0);
  const [userStatus, setUserStatus] = useState("");
  const { users, status } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const query = useQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser,indexOfLastUser)
  const totalPages = Math.ceil(users.length/usersPerPage)

  const handleChangePage = (e,page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchUsersByUsername(search));
      navigate(`/admin/users/search?searchQuery=${search}`);
    } else {
      dispatch(getUsersFromAdmin());
    }
  };

  const handleChangeUserStatus = (prop) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await setUserStatus(userStatus);
        await setUserId(prop.userId);
        await dispatch(
          changeUserStatusFromAdmin({
            id: prop.userId,
            currentStatus: prop.currentStatus,
          })
        );
      }
    });
  };

  useEffect(() => {
    console.log("refresh");
    dispatch(getUsersFromAdmin());
  }, []);

  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
      <Box
        display="grid"
        gridColumn="span 10"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={3}
        marginBottom={"20px"}
      >
        <Box
          gridColumn="span 6"
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <h2>All User</h2>
        </Box>
        <Box
          gridColumn="span 6"
          textAlign={"right"}
          sx={{
            display: "flex",
            paddingTop: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Box>
            <SearchIcon
              sx={{
                marginTop: "10px",
                marginRight: "10px",
                opacity: "0.3",
              }}
              fontSize="large"
            />
          </Box>
          <Box>
            <FormControl
              className="d-flex input-group w-auto"
              sx={{ bgColor: "white" }}
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Search"
                  placeholder="User name"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  style={{ width: "400px", bgColor: "white" }}
                />
              </form>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h3>User Name</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Create At</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Posts</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Full Name</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Status</h3>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 &&
              status === "successful" &&
              currentUsers.map((row) => {
                const date = new Date(row.createdAt);
                return (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">
                      {date.toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.totalPosts}
                    </TableCell>
                    <TableCell align="center">{row.fullname}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      <Fab
                        color="warning"
                        aria-label="delete"
                        size="small"
                        onClick={() =>
                          handleChangeUserStatus({
                            userId: row._id,
                            currentStatus: row.status,
                          })
                        }
                      >
                        {row.status === "Inactive" ? (
                          <LockRoundedIcon fontSize="small" />
                        ) : (
                          <LockOpenRoundedIcon fontSize="small" />
                        )}
                      </Fab>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack alignItems="center">
      <Pagination count={totalPages} color="primary" onChange={handleChangePage} size="large" variant="outlined" shape="rounded" />
      </Stack>
      <Stack spacing={2}>
        {users.length === 0 && status === "successful" && (
          <p>There is no user!</p>
        )}
      </Stack>
    </Box>
  );
}
