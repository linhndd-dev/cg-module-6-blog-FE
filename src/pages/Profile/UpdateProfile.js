import {Avatar, Button, Grid} from "@mui/material";
import * as React from "react";
// import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {storage} from "../firebase";
import {ref, getDownloadURL, uploadBytes, uploadBytesResumable} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../redux/apis";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";

export default function UpdateProfile() {
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("");
    const dispatch = useDispatch();
    let {user} = useSelector((state) => state.user);
    const login = JSON.parse(localStorage.getItem("login"));
    const userId = login?._id;
    console.log(user)
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
        setAvatar(avatar)
    };
    const handleSubmit = async (value) => {
        console.log('value', value)
        await dispatch(updateProfile({value, userId}))
        navigate('/user/profile')
    }
    return (
        <div className={'container'} style={{background: 'white'}}>
            <div className={'container'}>
                <h1>Cập Nhật Thông Tin</h1>
                <hr/>
                <Formik
                    initialValues={{
                        fullname: user.fullname,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        address: user.address,
                    }}
                    validationSchema={Yup.object({
                        fullName: Yup.string()
                            .min(2, "Must be more than  2 characters")
                            .max(15, "Must be 15 characters or less")
                            .required("Name is valid required!"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Email is valid required!"),
                        phoneNumber: Yup.number()
                            .required("PhoneNumber is valid required!"),
                        address: Yup.string().required("Email is valid required!")
                    })}
                    onSubmit={(values) => {
                        const storageRef = ref(storage, `/files/${file.name}`);
                        const uploadTask = uploadBytesResumable(storageRef, file);
                        uploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                const percent = Math.round(
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                );
                                setPercent(percent);
                            },
                            (err) => console.log(err),
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                    values.avatar = url;
                                    handleSubmit(values);
                                });
                            }
                        );
                    }}
                >
                    <Form>
                        <Box>
                            <Grid sx={{flexGrow: 1}} container spacing={8}>
                                <Grid item xs={12}>
                                    <Grid container spacing={8}>
                                        <Grid item>
                                            <Avatar
                                                sx={{
                                                    height: 400,
                                                    width: 400,
                                                    backgroundColor: (theme) =>
                                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                }}
                                                alt="Remy Sharp"
                                                src={avatar?.preview}
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
                                                        style={{display: "none"}}
                                                        id="upload-photo"
                                                        name="upload-photo"
                                                        type="file"
                                                        onChange={handleChangeFileBase}
                                                    />
                                                    <br/>
                                                    <Button color="primary" variant="contained" component="span">
                                                        Chỉnh Sửa
                                                    </Button>{" "}
                                                </label>
                                            </div>
                                        </Grid>
                                        <Grid item align="left">
                                            <div
                                                // style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                                            >
                                                <Typography variant={'h4'} gutterBottom>
                                                    <strong>Họ Và Tên :</strong>
                                                </Typography>
                                                <Field
                                                    id="fullname"
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
                                                <Typography variant={'h4'} gutterBottom>
                                                    <strong>Email :</strong>
                                                </Typography>
                                                <Field
                                                    id="email"
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
                                                <Typography variant={'h4'} gutterBottom>
                                                    <strong>Số Điện Thoại :</strong>
                                                </Typography>
                                                <Field
                                                    id="phoneNumber"
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
                                                <Typography variant={'h4'} gutterBottom>
                                                    <strong>Địa Chỉ :</strong>
                                                </Typography>
                                                <Field
                                                    id="address"
                                                    variant="outlined"
                                                    name="address"
                                                    type="text"
                                                    // style={{margin : "0px 55px" }}
                                                />
                                            </div>
                                            <div
                                                style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                                            >
                                                <Button variant="contained" color="primary" type="submit">
                                                    Cập Nhật
                                                </Button>
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    navigate('/user/profile')
                                                }}>Quay Lại</Button>
                                            </div>
                                            <Grid item align="left">
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
