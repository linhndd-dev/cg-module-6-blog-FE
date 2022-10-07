import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPost } from "../redux/apis";
import React, { useEffect, useRef, useState } from 'react';


const ProtectedPostRoute = ({ children }) => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    let {posts} = useSelector(state => state.post)
    let currentPost = {};
    for (let index = 0; index < posts.length; index++) {
        if (id === posts[index]._id) {
            currentPost = posts[index]
            break;
        } 
    }
    console.log(currentPost.status, user);
    if (posts && posts.status === 'public') return children;
    if (posts && posts.status === 'private') {
        if (user.username === 'admin') {
            return children;
        }
        else if (user.idUser === posts.author._id) {
            return children;
        } else {
            <Navigate to={'/login'} />
        }
    }

};

export default ProtectedPostRoute;
