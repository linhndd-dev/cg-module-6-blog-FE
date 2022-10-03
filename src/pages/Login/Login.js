import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik';





const Login = () => {
  const dispatch = useDispatch();
  const [loginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (values,{ resetForm }) => {
    dispatch(loginUser({values,resetForm,navigate }))
  };
  const handleValidate = (values) => {
    let error = {};
    if (!values.username) {
      error.username = 'Username is required'
    }
    if (!values.password) {
      error.password = 'Password is required'
    }
    return error;
  }
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
        <Formik
          initialValues={loginData}
          enableReinitialize
          validate={handleValidate}
          onSubmit = {(values,{ resetForm }) => handleSubmit(values,{ resetForm })}
        >
          <Form className={styles.form_container}>
            <h1>Login to Your Account</h1>
            <Field
              type="text"
              placeholder="username"
              name="username"
              // onChange={handleChange}
              // value={data.email}
              required
              className={styles.input}
            />
            <ErrorMessage component="div" className={styles.error_msg} name = 'username'></ErrorMessage>
            <Field
              type="password"
              placeholder="Password"
              name="password"
              // onChange={handleChange}
              // value={data.password}
              required
              className={styles.input}
            />
            <ErrorMessage component="div" className={styles.error_msg} name = 'password'></ErrorMessage>
            <button
              type="submit"
              className={styles.green_btn}
            >
              Sign In
            </button>
          </Form>
          </Formik>
          <Link to="/">
            <button type="button" className={styles.white_btn}>
              Back to Home
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/register">
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
