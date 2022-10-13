import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-left col-md-4 col-sm-6">
        <p class="about">
          <span> Giới thiệu về nhóm BlogChain</span>
          <p>
            Nhóm BlogChain được thành lập vào năm 2022, với bốn thành viên là
            Dũng, Đông, Linh, Tài. Website này được xây dựng nhằm mục đích tạo
            cho cộng đồng một nền tảng để chia sẻ những kiến thức bổ ích trong
            cuộc sống. Chúng tôi cũng hy vọng đây cũng là nơi kết nối bạn bè
            trên toàn cầu.
          </p>
        </p>
        <div class="icons">
          <a href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i class="fa fa-google-plus"></i>
          </a>
          <a href="#">
            <i class="fa fa-instagram"></i>
          </a>
        </div>
      </div>
      <div class="footer-center col-md-4 col-sm-6">
        <div>
          <i class="fa fa-map-marker"></i>
          <p>
            <span> Địa chỉ: </span> 17T4 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội
          </p>
        </div>
        <div>
          <i class="fa fa-phone"></i>
          <p> (+84) 123 456 789</p>
        </div>
        <div>
          <i class="fa fa-envelope"></i>
          <p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              {" "}
              blogchain@codegym.vn
            </a>
          </p>
        </div>
      </div>
      <div class="footer-right col-md-4 col-sm-6">
        <h2>
          {" "}
          Nhóm<span> BlogChain</span>
        </h2>
        <p class="menu">
          <a href="/"> Trang chủ</a> |<a href="/"> Dịch vụ</a> |
          <a href="/"> Giới thiệu</a> |<a href="/"> Tin tức</a> |
          <a href="/"> Liên hệ</a>
        </p>
        <p class="name"> BlogChain &copy; 2020</p>
      </div>
    </footer>
  );
};

export default Footer;
