import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { QedMessageAction } from "../ReduxStore/Index";
import eyeSlashIcon from "../Assets/images/eye-slash.png";
import axios from "axios";

function Signup() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const envAPI_URL = import.meta.env.VITE_API_URL;
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    walletName: "",
    password: "",
    bio: "",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [signupId, setSignupId] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // State for countdown timer

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const startResendTimer = () => {
    setCanResend(false);
    setTimeLeft(30); // Set the countdown duration in seconds

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOtp();
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${envAPI_URL}auth/generatesignupotp`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.status === 201) {
        setIsOtpSent(true);
        setSignupId(response.data.data.id);
        startResendTimer();
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during OTP generation:", error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${envAPI_URL}auth/verifysignupotp`, { id: signupId, otp }, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.status === 201) {
        dispatch(QedMessageAction.userAuthantication(response.data.data.token));
        alert("OTP verified successfully!");
        navigate("/home");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error.message);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post(`${envAPI_URL}auth/regeneratesignupotp`, { id: signupId }, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.status === 201) {
        alert("OTP Resent successfully!");
        startResendTimer();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during OTP resend:", error.message);
    }
  };

  return (<>
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>
        <div className="col-md-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <h3 className="display-6 sign-in-font mb-3">
                    {isOtpSent ? "Verify OTP" : "Create Account"}
                  </h3>
                  <form className="form-md" onSubmit={handleSubmit}>
                    {!isOtpSent ? (
                      <>
                        <div className="form-group">
                          <input
                            id="form_name1"
                            className="form-control"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="form_name1">First Name</label>
                        </div>
                        <div className="form-group">
                          <input
                            id="form_lastName"
                            className="form-control"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="form_lastName">Last Name</label>
                        </div>
                        <div className="form-group">
                          <input
                            id="form_email"
                            className="form-control"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="form_email">Email ID</label>
                        </div>
                        <div className="form-group">
                          <input
                            id="form_contactNumber"
                            className="form-control"
                            type="number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="form_contactNumber">Phone Number</label>
                        </div>
                        <div className="form-group">
                          <input
                            id="form_wallet"
                            className="form-control"
                            type="text"
                            name="walletName"
                            value={formData.walletName}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="form_wallet">Wallet Name</label>
                        </div>
                        <div className="form-group">
                          <input
                            id="form_bio"
                            className="form-control"
                            type="text"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="form_bio">Bio</label>
                        </div>
                        <div className="form-group position-relative">
                          <input
                            id="form_password"
                            className="form-control"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="form_password">Password</label>
                          <img
                            className="eye-icon"
                            src={eyeSlashIcon}
                            alt="Eye icon"
                            width="20"
                            height="20"
                          />
                        </div>
                        <div className="form-group mt-5">
                          <button type="submit" className="button btn btn-primary sign-in-btn w-100">
                            Next
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <input
                            id="form_otp"
                            className="form-control"
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                          />
                          <label htmlFor="form_otp">Enter OTP</label>
                        </div>
                        <div className="form-group mt-5">
                          <button
                            type="button"
                            className="button btn btn-primary sign-in-btn w-100"
                            onClick={verifyOtp}
                          >
                            Verify OTP
                          </button>
                        </div>
                        <div className="form-group mt-2">
                          <button
                            type="button"
                            className="button btn btn-primary sign-in-btn w-100"
                            onClick={resendOtp}
                            disabled={!canResend}
                          >
                            {canResend ? "Resend OTP" : `Resend OTP in ${timeLeft}s`}
                          </button>
                        </div>
                      </>
                    )}
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

export default Signup;
