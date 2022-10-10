import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";


const Login = () => {
  const dispatch = useDispatch();
  const [loginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(loginUser({ values, resetForm, navigate }));
  };
  if ("login" in localStorage) {
    navigate("/")
  }
  const [ profile, setProfile ] = useState([]);
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
    setProfile(res.profileObj);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };
  
  console.log(profile);
  const handleValidate = (values) => {
    let error = {};
    if (!values.username) {
      error.username = "Username is required";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <Formik
            initialValues={loginData}
            enableReinitialize
            validate={handleValidate}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, { resetForm })
            }
          >
            <Form className={styles.form_container}>
              <h1>Login your account</h1>
              <Field
                type="text"
                placeholder="Username"
                name="username"
                // onChange={handleChange}
                // value={data.email}
                required
                className={styles.input}
              />
              <ErrorMessage
                component="div"
                className={styles.error_msg}
                name="username"
              ></ErrorMessage>
              <br/>
              <Field
                type="password"
                placeholder="Password"
                name="password"
                // onChange={handleChange}
                // value={data.password}
                required
                className={styles.input}
              />
              <ErrorMessage
                component="div"
                className={styles.error_msg}
                name="password"
              ></ErrorMessage>
              <button type="submit" className={styles.green_btn}>
                Sign In
              </button>
            </Form>
          </Formik>
          <Link to="/">
            <button type="button" className={styles.white_btn}>
              Back to Home
            </button>
          </Link>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
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
