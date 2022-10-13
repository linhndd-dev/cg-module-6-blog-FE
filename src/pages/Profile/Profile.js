import { profileUser, resetPassword } from "../../redux/apis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import "./style.module.css";
import Button from "@mui/material/Button";
import { Field, Form, Formik, ErrorMessage } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function Profile() {
  // const [percent, setPercent] = useState(0);
  // const [file, setFile] = useState("");
  const { user } = useSelector((state) => state.auth);
  const login = JSON.parse(localStorage.getItem("login"));
  const userId = login?.idUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(profileUser(userId));
  }, []);
  const handleResetPassword = (password) => {
    dispatch(resetPassword({userId, password}))
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={"container"} style={{ background: "white" }}>
      <div className={"container"}>
        <h1>Thông Tin Cá Nhân</h1>
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
                    <strong>Username:</strong> {user.username}
                  </Typography>
                  <br />
                  <Typography
                    variant={"p"}
                    sx={{ fontSize: "1rem" }}
                    gutterBottom
                  >
                    <strong>Fullname:</strong> {user.fullname}
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
                    <strong>{"Phonenumber"}:</strong> {user.phoneNumber}
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
                    Cập Nhật Thông Tin
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 2, marginTop: 2 }}
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    Đổi Mật Khẩu
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 2, marginTop: 2 }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Quay Lại
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
              } else if(values.newPassword == values.oldPassword){
                errors.newPassword = "Password already used"
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = "Require";
              } else if(values.confirmPassword != values.newPassword){
                errors.confirmPassword = "Password incorrect"
              }
              return errors;
            }}
            onSubmit={(values) => {handleResetPassword(values.newPassword)}}
          >
            <Form className="container">
              Old Password
              <Field name="oldPassword" className="inputText" />
              <ErrorMessage className="error" name="oldPassword" component="div" />
              <br />
              New Password
              <Field
                name="newPassword"
                className="inputText"
              />
              <ErrorMessage className="error" name="newPassword" component="div" />
              <br />
              Re-Enter Password
              <Field
                name="confirmPassword"
                className="inputText"
              />
              <ErrorMessage className="error" name="confirmPassword" component="div" />
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
