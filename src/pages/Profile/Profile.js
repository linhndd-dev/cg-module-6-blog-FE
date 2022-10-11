// import {profileUsers} from '../../redux/apis';
// import {useDispatch, useSelector} from "react-redux";
// import {useNavigate, useParams} from "react-router-dom";
// import React, {useEffect, useState} from "react";
// import Typography from "@mui/material/Typography";
// import {Avatar, Container, CssBaseline, Grid} from "@mui/material";
// import {Box} from "@mui/system";
// import Stack from '@mui/material/Stack';
// import {deepOrange, deepPurple} from '@mui/material/colors';
// import './style.module.css'
// import Button from "@mui/material/Button";
// import Image from "mui-image";
//
// export default function Profile() {
//     const [percent, setPercent] = useState(0);
//     const [file, setFile] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     let {id} = useParams
//     let {user} = useSelector(state => state)
//     console.log(user)
//     useEffect(() => {
//         dispatch(profileUsers(id))
//         console.log(id)
//     }, [])
//
//     return (
//         <div className={'container'} style={{background: 'white'}}>
//             <div className={'container'} >
//                 <h1>Profile</h1>
//                 <hr/>
//                 <Box >
//                     <Stack direction="row" spacing={2}>
//                         <Avatar sx={{width: '200px', height: '200px', bgcolor: deepOrange[500]}}>N</Avatar>
//                     </Stack>
//                     {/*<Button paddingleft={10} style={{backgroundColor: "#1a1a1a"}} variant="contained" component="span">*/}
//                     {/*    Upload*/}
//                     {/*</Button>{" "}*/}
//                     <Box paddingTop={5} md={5} width={'100%'} height={'100%'}>
//                         {/*<Image>{user.avatar}</Image>*/}
//                         <Typography gutterBottom >
//                             <strong>{'UserName'} :</strong> {'fshajshdsajdhsjadbhvfdsjbhjsdfbh'}
//                         </Typography>
//                         <br/>
//                         <Typography gutterBottom align={'left'}>
//                             <strong>{'FullName'} :</strong> {'fshajshdsajdhsjadbhvfdsjbhjsdfbh'}
//                         </Typography>
//                         <br/>
//                         <Typography gutterBottom align={'left'}>
//                             <strong>{'Name'} :</strong> {'fshajshdsajdhsjadbhvfdsjbhjsdfbh'}
//                         </Typography>
//                         <br/>
//                         <Typography gutterBottom align={'left'}>
//                             <strong>{'Name'} :</strong> {'fshajshdsajdhsjadbhvfdsjbhjsdfbh'}
//                         </Typography>
//                         <br/>
//                         <Typography gutterBottom align={'left'}>
//                             <strong>{'Name'} :</strong> {'fshajshdsajdhsjadbhvfdsjbhjsdfbh'}
//                         </Typography>
//                     </Box>
//                     <Button onClick={() => {
//                         navigate('/profile/update')
//                     }}>Update
//                     </Button>
//                 </Box>
//             </div>
//         </div>
//
//
//     )
// }