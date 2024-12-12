import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { QedMessageAction } from "../ReduxStore/Index";
import Alert from "../Components/Alert";
import eyeSlashIcon from "../Assets/images/eye-slash.png";
import "../Components/login.css";



function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const envAPI_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    document.body.className = "rootback"; // Apply class directly to <body>
    return () => {
      document.body.className = ""; // Cleanup on unmount
    };
  }, []);

  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    fireBaseToken: "",
    deviceType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userLogin = async (userData) => {
    try {;
      const response = await axios.post(`${envAPI_URL}auth/signin`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("userLogin", response.data.data);
      if (response.data.status === 200) {
        dispatch(QedMessageAction.userAuthantication(response.data.data));
        alert(response.data.message)
        navigate("/home"); // Redirect to the home page
      } else {
        alert(response.data.data.message)
        setError(response.data.data.message); // Display error message
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("An error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Encode email and password
    const encodedEmail = window.btoa(userData.email);
    const encodedPassword = window.btoa(userData.password);
    const updatedUserData = {
      ...userData,
      email: encodedEmail,
      password: encodedPassword,
    };

    userLogin(updatedUserData);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>

          <div className="col-md-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-6 sign-in-font mb-3">Sign in</h3>
                    <form className="form-md" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          id="email"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="form_name1">Email ID</label>
                      </div>

                      <div className="form-group position-relative">
                        <input
                          className="form-control"
                          type="password"
                          id="password"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="form_name2">Password</label>
                        <img
                          className="eye-icon"
                          src={eyeSlashIcon}
                          alt="Eye icon"
                          width="20"
                          height="20"
                        />
                      </div>

                      {error && (
                        <p className="error" style={{ color: "red" }}>
                          {error}
                        </p>
                      )}

                      <p className="forgot-password mt-1 text-end">
                        <Link
                          to="/forgotpassword"
                          style={{ textDecoration: "none", color: "#007BFF" }}
                        >
                          Forgot Password?
                        </Link>
                      </p>
                      <div className="form-group mt-5">
                        <button className="button  btn btn-primary sign-in-btn w-100">
                          Sign in
                        </button>
                      </div>

                      <p className="sign-up-text mt-2 text-end">
                        Don’t have an account?{" "}
                        <Link
                          to="/signup"
                          style={{ textDecoration: "none", color: "#007BFF" }}
                        >
                          <span>Sign Up</span>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
