import { profileUser, resetPassword } from "../../redux/apis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Container, CssBaseline, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { Field, Form, Formik, ErrorMessage } from "formik";

const style = {
  backgroundColor:"white",
  borderRadius:"8px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const login = JSON.parse(localStorage.getItem("login"));
  const userId = login?.idUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(profileUser(userId));
  }, []);
  const handleResetPassword = (password) => {
    dispatch(resetPassword({ userId, password }));
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{ width: "1000px", bgcolor:"white" }}>
        <Box sx={{ height: "auto" }}>
          <div>
            <h1>Personal Information</h1>
            <Box>
              <Grid sx={{ flexGrow: 1 }} container spacing={8}>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item>
                      <Avatar
                        sx={{
                          height: 300,
                          width: 300,
                          margin: 2,
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                        }}
                        src={user.avatar}
                      />
                    </Grid>
                    <Grid item align="left" sx={{ marginTop: 10 }}>
                      <Typography
                        variant={"p"}
                        sx={{ fontSize: "1rem" }}
                        gutterBottom
                      >
                        <strong>User Name:</strong> {user.username}
                      </Typography>
                      <br />
                      <Typography
                        variant={"p"}
                        sx={{ fontSize: "1rem" }}
                        gutterBottom
                      >
                        <strong>Full Name:</strong> {user.fullname}
                      </Typography>
                      <br />
                      <Typography
                        variant={"p"}
                        sx={{ fontSize: "1rem" }}
                        gutterBottom
                      >
                        <strong>{"Email"}:</strong> {user.email}
                      </Typography>
                      <br />
                      <Typography
                        variant={"p"}
                        sx={{ fontSize: "1rem" }}
                        gutterBottom
                      >
                        <strong>{"Phone Number"}:</strong> {user.phoneNumber}
                      </Typography>
                      <br />
                      <Typography
                        variant={"p"}
                        sx={{ fontSize: "1rem" }}
                        gutterBottom
                      >
                        <strong>{"Address"}:</strong> {user.address}
                      </Typography>
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: 2, marginTop: 2 }}
                        onClick={() => {
                          navigate("/user/profile/changeinfo");
                        }}
                      >
                        Update Information
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: 2, marginTop: 2 }}
                        onClick={() => {
                          handleOpen();
                        }}
                      >
                        Update Password
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: 2, marginTop: 2 }}
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Back
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  reEnterPassword: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.oldPassword) {
                    errors.oldPassword = "Require";
                  }
                  if (!values.newPassword) {
                    errors.newPassword = "Require";
                  } else if (values.newPassword == values.oldPassword) {
                    errors.newPassword = "Password already used";
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword = "Require";
                  } else if (values.confirmPassword != values.newPassword) {
                    errors.confirmPassword = "Password incorrect";
                  }
                  return errors;
                }}
                onSubmit={(values) => {
                  handleResetPassword(values.newPassword);
                }}
              >
                <Form style={{border:"none", borderRadius:"6px"}}>
                  Old Password
                  <Field name="oldPassword" className="inputText" />
                  <ErrorMessage
                    className="error"
                    name="oldPassword"
                    component="div"
                  />
                  <br />
                  New Password
                  <Field name="newPassword" className="inputText" />
                  <ErrorMessage
                    className="error"
                    name="newPassword"
                    component="div"
                  />
                  <br />
                  Re-Enter Password
                  <Field name="confirmPassword" className="inputText" />
                  <ErrorMessage
                    className="error"
                    name="confirmPassword"
                    component="div"
                  />
                  <Button type="submit" variant="contained">
                    Update
                  </Button>
                </Form>
              </Formik>
            </Box>
          </Modal>
        </Box>
      </Container>
    </React.Fragment>
  );
}
