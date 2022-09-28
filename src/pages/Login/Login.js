import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";




const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  // const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(loginData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData))
    .then(() => {
      navigate('/')
    })
    .catch(() => {
      navigate('/login')
    })
    
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
              // value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              // value={data.password}
              required
              className={styles.input}
            />
            {/* {error && <div className={styles.error_msg}>{error}</div>} */}
            <button
              type="submit"
              className={styles.green_btn}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
