import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getAllPost } from "../redux/apis";

export default function ListPost(){
    const navigate = useNavigate();
    const dispath = useDispatch();
    let local = JSON.parse(localStorage.getItem('login'));
    let id = local.idUser
    useEffect(() => {
        dispath(getAllPost(id));
    },[])
    const posts = useSelector(state => state.posts.posts)
    console.log(posts);
    return (
        <div>
            
        </div>
    )
}