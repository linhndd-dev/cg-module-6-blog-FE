import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Virtual } from "swiper";
import { useSwiper } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import "./styles.css"
const PaginationSwiper = ({posts}) => {
  const navigate = useNavigate();
  const handleShowDetail = (postId) => {
    navigate(`/post/${postId}`)
  }
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      effect={"fade"}
    >
      {posts.map((item) => (
        <SwiperSlide>
          <ImageListItem key={item._id} onClick={()=>handleShowDetail(item._id)}>
            <img
              cursor="pointer"
              src={`${item.avatar}?w=248&fit=crop&auto=format`}
              srcSet={`${item.avatar}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{maxHeight:"400px", maxWidth:"800px"}}
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author.name}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default PaginationSwiper;
