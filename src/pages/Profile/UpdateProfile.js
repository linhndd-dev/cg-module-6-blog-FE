import {Avatar, Button, Fab} from "@mui/material";
import * as React from "react";
import TextField from '@mui/material/TextField';
import {useEffect, useState} from "react";
import {useFormik} from "formik"
import * as Yup from "yup"
import {ref, getDownloadURL, uploadBytes} from "firebase/storage";
import {storage} from "../firebase";
import {useNavigate} from "react-router-dom";


export default function UpdateProfile() {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            fullName: "",
            email: "",
            phoneNumber: "",
            address: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(2,'Must be more than  2 characters')
                .max(15, 'Must be 15 characters or less')
                .required('Name is valid required!'),
            email: Yup.string().email('Invalid email address').required('Email is valid required!'),
            // phoneNumber: Yup.number()
            //     .phoneNumber(10,'Your phone number is not in the correct format')
            //     .required('PhoneNumber is valid required!'),
            address: Yup.string()
                .required('Address is valid required!')
        }),
        onSubmit: async (values, helpers) => {
            console.log(values)
            let imageUpload = image;
            if (imageUpload) {
                const imageRef = ref(storage, `images/${imageUpload?.name}`);
                uploadBytes(imageRef, imageUpload).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        console.log(url)
                    });
                });
            }

        },
    })

    const [info, setInfo] = useState({})
    const [image, setImage] = useState()
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image?.preview)
        }
    }, [image])


    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setImage(file)

    }
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
        console.log(e.target.value)
    }
    return (
        <div className={'container'}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <form onSubmit={formik.handleSubmit}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{margin: "7px 10px"}}>
                            <Avatar alt="Remy Sharp" src={image?.preview}
                                    sx={{width: "100px", height: "100px", margin: "5px 5px"}}/>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <label htmlFor="upload-photo">
                                <input
                                    style={{display: "none"}}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={handlePreviewAvatar}
                                />
                                <br/>
                                <br/>
                                <Button style={{backgroundColor: "#1a1a1a"}} variant="contained" component="span">
                                    Upload
                                </Button>{" "}
                            </label>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
                        <TextField
                            id="outlined-basic"
                            label="FullName"
                            variant="outlined"
                            sx={{width: "70%"}}
                            name="fullName"
                            type="text"
                            onChange={formik.handleChange}
                            error={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ''}
                            helperText={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ''}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                        />
                    </div>
                    <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            sx={{width: "70%"}}
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                    </div>
                    <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
                        <TextField
                            id="outlined-basic"
                            label="PhoneNumber"
                            variant="outlined"
                            // sx={{width: "70%"}}
                            name="phoneNumber"
                            type="number"
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ''}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ''}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                        />
                    </div>

                    <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
                        <TextField
                            id="outlined-basic" label="Address" variant="outlined" sx={{width: "70%"}}
                            name="address"
                            type="text"
                            onChange={formik.handleChange}
                            error={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                            helperText={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                        />
                    </div>
                    <div style={{display: "flex", alignItems: "left", margin: " 20px 7px"}}>
                        <Button variant="contained" style={{backgroundColor: "#1a1a1a"}} type="submit" onClick={()=>{
                            navigate('/profile')
                        }}>Update</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}