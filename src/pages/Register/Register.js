import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const Register = () => {
  const [registerDataFromForm] = useState({
    username: "",
    password: "",
    rePassword: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if ("login" in localStorage) {
    navigate("/");
  }
  const handleSubmit = (values, { resetForm }) => {
    const registerData = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    dispatch(registerUser({ registerData, resetForm, navigate }));
  };
  const handleValidate = (values) => {
    let error = {};
    if (!values.username) {
      error.username = "Username is required";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 6 || values.password.length > 8) {
      error.password = "Password is only 6 to 8 characters";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      error.email = "Email is invalid";
    }
    if (values.password !== values.rePassword) {
      error.rePassword = "Re-Password does not match";
    }
    return error;
  };
  const clientId =
    "29737193528-hno6anlc8b7vfqhu6rj60rru828o3m8r.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const onSuccess = (res) => {
    console.log("success:", res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <Formik
            initialValues={registerDataFromForm}
            enableReinitialize
            validate={handleValidate}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, { resetForm })
            }
          >
            <Form className={styles.form_container}>
            <img
            onClick={() => navigate("/")}
            width="180px" height="148px"
            src='https://firebasestorage.googleapis.com/v0/b/image-blog-dbb1d.appspot.com/o/files%2Flogo-blog-13.png?alt=media&token=7da77104-fae0-423e-a670-20482a33b5c6'
          />
              <h1>Register a new account</h1>
              <Field
                type="text"
                placeholder="Username"
                name="username"
                //   onChange={handleChange}
                // value={data.email}

                className={styles.input}
              />
              <ErrorMessage
                component="div"
                className={styles.error_msg}
                name="username"
              ></ErrorMessage>
              <Field
                type="text"
                placeholder="Email"
                name="email"
                //   onChange={handleChange}
                // value={data.email}

                className={styles.input}
              />
              <ErrorMessage
                component="div"
                className={styles.error_msg}
                name="email"
              ></ErrorMessage>
              <Field
                type="password"
                placeholder="Password"
                name="password"
                //   onChange={handleChange}
                // value={data.password}

                className={styles.input}
              />
              <ErrorMessage
                component="div"
                className={styles.error_msg}
                name="password"
              ></ErrorMessage>
              <Field
                type="password"
                placeholder="Re-Password"
                name="rePassword"
                //   onChange={handleChange}
                // value={data.password}

                className={styles.input}
              />
              <ErrorMessage
                component="div"
                className={styles.error_msg}
                name="rePassword"
              ></ErrorMessage>
              <button type="submit" className={styles.green_btn}>
                Register
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
          <h1>Have account ?</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign In
            </button>
          </Link>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Register;
