import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getAllMyPost } from "../redux/apis";

export default function ListPost(){
    const navigate = useNavigate();
    const dispath = useDispatch();
    // const posts = useSelector(state => state.posts.posts.posts)
    
    // useEffect(() => {
    //     dispath(getAllMyPost());
    // },[])
    
    return (
        <div>
            list post
        </div>
    )
}