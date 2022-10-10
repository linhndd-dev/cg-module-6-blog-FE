import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton,Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';





const LikeBox = (props) => {
    const {likeCount,onLike} = props;
    const [liked, setLiked] = useState(props.liked);
    const login = JSON.parse(localStorage.getItem("login"));
    const userId = login?.idUser;
    console.log(props.liked);
    const navigate = useNavigate();

    const handleLike = (e) => {
        if (userId) {
            const newLikedValue = !liked;
            setLiked(newLikedValue);
            onLike(newLikedValue);
        } else {
            navigate("/login");
        }
    }
    return (
        <>
            <span>
                <IconButton onClick={handleLike}>
                    {liked ? (
                        <ThumbUpIcon fontSize="small" />
                    ) : (
                        <ThumbUpOutlinedIcon fontSize="small" />
                    )}
                </IconButton>
                {likeCount}
            </span>
        </>
    )
}
export default LikeBox;