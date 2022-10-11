import {Avatar, Button} from "@mui/material";
import * as React from "react";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {storage} from "../firebase";
import {ref, getDownloadURL, uploadBytes} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../redux/apis";
import {useNavigate} from "react-router-dom";
//
// export default function UpdateProfile() {
//     let {user} = useSelector((state) => state.user);
//     console.log(user)
//     const [infor, setInfor] = useState({})
//     // const userId = login?.idUser;
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const formik = useFormik({
//         initialValues: {
//             fullname: user && user.fullname,
//             email: user && user.email,
//             phoneNumber: user && user.phoneNumber,
//             address: user && user.address,
//         },
//         //validate
//         validationSchema: Yup.object({
//             fullName: Yup.string()
//                 .min(2, "Must be more than  2 characters")
//                 .max(15, "Must be 15 characters or less")
//                 .required("Name is valid required!"),
//             email: Yup.string()
//                 .email("Invalid email address")
//                 .required("Email is valid required!"),
//             phoneNumber: Yup.number()
//                 .required("PhoneNumber is valid required!"),
//             address: Yup.string().required("Email is valid required!"),
//
//         }),
//
//         onSubmit: async (values) => {
//             console.log('aaaaa')
//             let imageUpload = image;
//             if (imageUpload) {
//                 const imageRef = ref(storage, `images/${imageUpload?.name}`);
//                 uploadBytes(imageRef, imageUpload).then((snapshot) => {
//                     getDownloadURL(snapshot.ref).then((url) => {
//                         values.avatar = url;
//                         let data = {
//                             user: values,
//                         };
//                         console.log(data)
//                         dispatch(updateProfile(data));
//                         navigate('http://localhost:3000')
//                     });
//                 });
//             }
//         },
//     });
//     // console.log(formik)
//
//     const [image, setImage] = useState();
//     useEffect(() => {
//         return () => {
//             image && URL.revokeObjectURL(image?.preview);
//         };
//     }, [image]);
//
//     const handlePreviewAvatar = (e) => {
//         const file = e.target.files[0];
//         file.preview = URL.createObjectURL(file);
//         setImage(file);
//     };
//     return (
//         <div style={{display: "flex", flexDirection: "column"}}>
//             <form onSubmit={(e) => {
//                 console.log(1)
//                 e.preventDefault();
//                 formik.handleSubmit()
//             }
//             }>
//                 <div style={{display: "flex", flexDirection: "row"}}>
//                     <div style={{margin: "7px 10px"}}>
//                         <Avatar
//                             alt="Remy Sharp"
//                             src={image?.preview}
//                             sx={{width: "100px", height: "100px", margin: "5px 5px"}}
//                         />
//                     </div>
//                     <div
//                         style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                         }}
//                     >
//                         <label htmlFor="upload-photo">
//                             <input
//                                 style={{display: "none"}}
//                                 id="upload-photo"
//                                 name="upload-photo"
//                                 type="file"
//                                 onChange={handlePreviewAvatar}
//                             />
//                             <br/>
//                             <Button color="primary" variant="contained" component="span">
//                                 Upload
//                             </Button>{" "}
//                         </label>
//                     </div>
//                 </div>
//
//                 <div
//                     style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
//                 >
//                     <TextField
//                         id="fullname"
//                         label="FullName"
//                         variant="outlined"
//                         name="fullname"
//                         type="text"
//                         onChange={formik.handleChange}
//                         error={
//                             formik.touched.fullname && formik.errors.fullname
//                                 ? formik.errors.fullname
//                                 : ""
//                         }
//                         helperText={
//                             formik.touched.fullname && formik.errors.fullname
//                                 ? formik.errors.fullname
//                                 : ""
//                         }
//                         onBlur={formik.handleBlur}
//                         value={formik.values.fullname}
//                     />
//                 </div>
//                 <div
//                     style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
//                 >
//                     <TextField
//                         id="email"
//                         label="Email"
//                         variant="outlined"
//                         name="email"
//                         type="email"
//                         onChange={formik.handleChange}
//                         error={
//                             formik.touched.email && formik.errors.email
//                                 ? formik.errors.email
//                                 : ""
//                         }
//                         helperText={
//                             formik.touched.email && formik.errors.email
//                                 ? formik.errors.email
//                                 : ""
//                         }
//                         onBlur={formik.handleBlur}
//                         value={formik.values.email}
//                     />
//                 </div>
//                 <div
//                     style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
//                 >
//                     <TextField
//                         id="phoneNumber"
//                         label="Phone number"
//                         variant="outlined"
//                         name="phoneNumber"
//                         type="text"
//                         onChange={formik.handleChange}
//                         error={
//                             formik.touched.phoneNumber && formik.errors.phoneNumber
//                                 ? formik.errors.phoneNumber
//                                 : ""
//                         }
//                         helperText={
//                             formik.touched.phoneNumber && formik.errors.phoneNumber
//                                 ? formik.errors.phoneNumber
//                                 : ""
//                         }
//                         onBlur={formik.handleBlur}
//                         value={formik.values.phoneNumber}
//                     />
//                 </div>
//                 <div
//                     style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
//                 >
//                     <TextField
//                         id="address"
//                         label="Address"
//                         variant="outlined"
//                         name="address"
//                         type="text"
//                         onChange={formik.handleChange}
//                         error={
//                             formik.touched.address && formik.errors.address
//                                 ? formik.errors.address
//                                 : ""
//                         }
//                         helperText={
//                             formik.touched.address && formik.errors.address
//                                 ? formik.errors.address
//                                 : ""
//                         }
//                         onBlur={formik.handleBlur}
//                         value={formik.values.address}
//                     />
//                 </div>
//                 <div
//                     style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
//                 >
//                     <Button variant="contained" color="primary" type="submit">
//                         Update
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// }
// import {Avatar, Button, Fab} from "@mui/material";
// import * as React from "react";
// import TextField from '@mui/material/TextField';
// import {useEffect, useState} from "react";
// import {useFormik, Formik} from "formik"
// import * as Yup from "yup"
// import {storage} from "../firebase";
// import {ref, getDownloadURL, uploadBytes} from "firebase/storage";
// import {useDispatch, useSelector} from "react-redux";
// import {updateProfile} from "../../redux/apis";
// import {useNavigate} from "react-router-dom";
//
//
// export default function RightContent() {
//     let {user} = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const formik = useFormik({
//         initialValues: {
//             fullname: user && user.fullname,
//             email: user && user.email,
//             phoneNumber: user && user.phoneNumber,
//             address: user && user.address,
//
//         },
//         validationSchema: Yup.object({
//             fullName: Yup.string()
//                 .min(2,'Must be more than  2 characters')
//                 .max(15, 'Must be 15 characters or less')
//                 .required('Name is valid required!'),
//             email: Yup.string().email('Invalid email address').required('Email is valid required!'),
//         }),
//         onSubmit: async (values, helpers) => {
//             console.log(values)
//             let imageUpload = image;
//             if (imageUpload) {
//                 const imageRef = ref(storage, `images/${imageUpload?.name}`);
//                 uploadBytes(imageRef, imageUpload).then((snapshot) => {
//                     getDownloadURL(snapshot.ref).then((url) => {
//                         console.log(url)
//                         let data = {
//                              user: values,
//                       };
//                         dispatch(updateProfile(data));
//                         navigate('http://localhost:3000')
//                     });
//                 });
//             }
//
//         },
//     })
//
//     const [infor, setInfor] = useState({})
//     const [image, setImage] = useState()
//     useEffect(() => {
//         return () => {
//             image && URL.revokeObjectURL(image?.preview)
//
//         }
//     }, [image])
//
//     const handlePreviewAvatar = (e) => {
//         const file = e.target.files[0]
//         file.preview = URL.createObjectURL(file)
//         setImage(file)
//
//     }
//     const handleChange = (e) => {
//         setInfor({
//             ...infor,
//             [e.target.name]: e.target.value
//         })
//         console.log(e.target.value)
//     }
//     return (
//         <div style={{display: "flex", flexDirection: "column"}}>
//             <form onSubmit={formik.handleSubmit}>
//
//                 <div style={{display: "flex", flexDirection: "row"}}>
//                     <div style={{margin: "7px 10px"}}>
//                         <Avatar alt="Remy Sharp" src={image?.preview}
//                                 sx={{width: "100px", height: "100px", margin: "5px 5px"}}/>
//                     </div>
//                     <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
//                         <label htmlFor="upload-photo">
//                             <input
//                                 style={{display: "none"}}
//                                 id="upload-photo"
//                                 name="upload-photo"
//                                 type="file"
//                                 // onChange={(e) => setImage(e.target.files[0])}
//                                 onChange={handlePreviewAvatar}
//                             />
//                             <br/>
//
//                             <Button color="success" variant="contained" component="span">
//                                 Tải ảnh lên
//                             </Button>{" "}
//                         </label>
//                     </div>
//                 </div>
//
//                 <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                     <TextField
//                         id="outlined-basic"
//                         label="Full Name"
//                         variant="outlined"
//                         sx={{width: "70%"}}
//                         name="fullname"
//                         type="text"
//                         onChange={formik.handleChange}
//                         error={formik.touched.fullname && formik.errors.fullname ? formik.errors.fullname : ''}
//                         helperText={formik.touched.fullname && formik.errors.fullname ? formik.errors.fullname : ''}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.fullname}
//                     />
//                     {/*{formik.touched.fullName && formik.errors.fullName ? (*/}
//                     {/*    <div>{formik.errors.fullName}</div>*/}
//                     {/*) : null}*/}
//                 </div>
//
//                 <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                     <TextField
//                         id="outlined-basic" label="Email" variant="outlined" sx={{width: "70%"}}
//                         name="email"
//                         type="text"
//                         onChange={formik.handleChange}
//                         error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
//                         helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.email}
//                     />
//                 </div>
//                 <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                     <TextField
//                         id="outlined-basic" label="PhoneNumber" variant="outlined" sx={{width: "70%"}}
//                         name="phoneNumber"
//                         type="text"
//                         onChange={formik.handleChange}
//                         error={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ''}
//                         helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ''}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.phoneNumber}
//                     />
//                 </div>
//                 <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                     <TextField
//                         id="outlined-basic" label="Address" variant="outlined" sx={{width: "70%"}}
//                         name="address"
//                         type="text"
//                         onChange={formik.handleChange}
//                         error={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
//                         helperText={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.address}
//                     />
//                 </div>
//                 <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
//                     <Button variant="contained" color="success"  type="submit">Cập nhật</Button>
//                 </div>
//             </form>
//         </div>
//     )
// }

export default function UpdateProfile() {
    const dispatch = useDispatch();
    let {user} = useSelector((state) => state.user);
    const login = JSON.parse(localStorage.getItem("login"));
    const userId = login?.idUser;
    console.log(user)
    const navigate = useNavigate();
    const [image, setImage] = useState();
    // const [infor, setInfor] = useState({})
    // const login = JSON.parse(localStorage.getItem("login"));
    // const userId = login?.idUser;
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image?.preview);
        };
    }, [image]);
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };
    const handleSubmit = (value) => {
        console.log('value', value)
        dispatch(updateProfile(userId,value))
        navigate('/')
    }
    return (
        <Formik
            initialValues={{
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
            }}
            onSubmit={ async(values, helpers) => {
                let imageUpload = image;

                    const imageRef = ref(storage, `images/${imageUpload?.name}`);
                    uploadBytes(imageRef, imageUpload).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            values.avatar = url;
                            let data = {
                                user: values,
                            };
                            console.log('data',data)
                            console.log('id',user._id)

                            dispatch(updateProfile(user._id,data));
                            navigate('http://localhost:3000')
                        });
                    });

            }}
        >
            <div style={{display: "flex", flexDirection: "column"}}>
                <Form onSubmit={handleSubmit}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{margin: "7px 10px"}}>
                            <Avatar
                                alt="Remy Sharp"
                                src={image?.preview}
                                sx={{width: "100px", height: "100px", margin: "5px 5px"}}
                            />
                        </div>
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
                                    onChange={handlePreviewAvatar}
                                />
                                <br/>
                                <Button color="primary" variant="contained" component="span">
                                    Upload
                                </Button>{" "}
                            </label>
                        </div>
                    </div>

                    <div
                        style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                    >
                        <lable>FullName</lable>
                        <Field
                            id="fullname"
                            variant="outlined"
                            name="fullname"
                            type="text"
                        />
                    </div>
                    <div
                        style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                    >
                        <label>Email</label>
                        <Field
                            id="email"
                            variant="outlined"
                            name="email"
                            type="email"
                        />
                    </div>
                    <div
                        style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                    >
                        <label>Phone Number</label>
                        <Field
                            id="phoneNumber"
                            variant="outlined"
                            name="phoneNumber"
                            type="text"
                        />
                    </div>
                    <div
                        style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                    >
                        <lable>Address</lable>
                        <Field
                            id="address"
                            variant="outlined"
                            name="address"
                            type="text"
                        />
                    </div>
                    <div
                        style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}
                    >
                        <Button variant="contained" color="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            </div>
        </Formik>
    )
}
