import {
  Avatar,
  Button,
  Grid,
  Box,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import * as React from "react";
// import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../redux/apis";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../firebase";
import "./update-profile.css"

export default function UpdateProfile() {
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  const login = JSON.parse(localStorage.getItem("login"));
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar?.preview);
    };
  }, [avatar]);
  const handleChangeFileBase = async (event) => {
    await setFile(event.target.files[0]);
    const avatar = event.target.files[0];
    avatar.preview = URL.createObjectURL(avatar);
    setAvatar(avatar);
  };
  const handleSubmit = async (value) => {
    await dispatch(updateProfile({ values: value, userId: user._id }));
    navigate("/user/profile");
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{ width: "1000px" }}>
        <Box sx={{ height: "auto" }}>
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
                <h1>Cập Nhật Thông Tin</h1>
              </Box>
            </Box>
            <Formik
              initialValues={{
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
              }}
              onSubmit={(values) => {
                if (!file) {
                  values.avatar = user.avatar;
                  handleSubmit(values);
                } else {
                  const storageRef = ref(storage, `/files/${file.name}`);
                  uploadBytes(storageRef, file).then(async (snapshot) => {
                    await getDownloadURL(snapshot.ref).then((url) => {
                      values.avatar = url;
                      handleSubmit(values);
                    });
                  });
                }
              }}
            >
              <Form>
                <Box>
                  <Grid sx={{ flexGrow: 1 }} container spacing={8}>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item>
                          <Avatar
                            sx={{
                              height: 400,
                              width: 400,
                              pointerEvents: "auto",
                              backgroundColor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "#1A2027"
                                  : "#fff",
                            }}
                            alt="Remy Sharp"
                            // src={user.avatar}
                            src={!avatar ? user.avatar : avatar.preview}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <label htmlFor="upload-photo">
                              <input
                                style={{ display: "none" }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                onChange={handleChangeFileBase}
                              />
                              <br />
                              <Button
                                color="primary"
                                variant="contained"
                                component="span"
                              >
                                Chỉnh Sửa
                              </Button>{" "}
                            </label>
                          </div>
                        </Grid>
                        <Grid item align="left">
                          <div
                          // style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                          >
                            <Typography variant={"h6"} marginBottom="6px" gutterBottom>
                              <strong>Họ Và Tên</strong>
                            </Typography>
                            <Field
                              className="inputText"
                              variant="outlined"
                              name="fullname"
                              type="text"
                              // style={{margin : "0px" , width:'250%' }}
                            />
                          </div>
                          {/*<br/>*/}
                          <div
                          // style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                          >
                            <Typography variant={"h6"} marginBottom="6px" gutterBottom>
                              <strong>Email</strong>
                            </Typography>
                            <Field
                              className="inputText"
                              variant="outlined"
                              name="email"
                              type="email"
                              // style={{margin : "0px 55px" }}
                            />
                          </div>
                          {/*<br/>*/}
                          <div
                          // style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                          >
                            <Typography variant={"h6"} marginBottom="6px" gutterBottom>
                              <strong>Số Điện Thoại</strong>
                            </Typography>
                            <Field
                              className="inputText"
                              variant="outlined"
                              name="phoneNumber"
                              type="text"
                              // style={{margin : "0px 55px" }}
                            />
                          </div>
                          {/*<br/>*/}
                          <div
                          // style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                          >
                            <Typography variant={"h6"} marginBottom="6px" gutterBottom>
                              <strong>Địa Chỉ</strong>
                            </Typography>
                            <Field
                              className="inputText"
                              variant="outlined"
                              name="address"
                              type="text"
                              // style={{margin : "0px 55px" }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "left",
                              margin: " 24px 7px",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ marginRight: 2, marginTop: 2 }}
                              type="submit"
                            >
                              Cập Nhật
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ marginRight: 2, marginTop: 2 }}
                              onClick={() => {
                                navigate("/user/profile");
                              }}
                            >
                              Quay Lại
                            </Button>
                          </div>
                          <Grid item align="left"></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
