import React, { useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QedMessageAction } from "../ReduxStore/Index";

function Otp({ signupId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const envAPI_URL = import.meta.env.VITE_API_URL;

  const [otp, setOtp] = useState(""); // Store OTP as a string
  const inputsRef = useRef([]); // Reference to input fields

  // Handle input change
  const handleChange = (e, index) => {
    const { value } = e.target;

    // Allow only digits
    if (/^\d?$/.test(value)) {
      const otpArray = otp.split("");
      otpArray[index] = value; // Update the digit at the current index
      const updatedOtp = otpArray.join("").padEnd(4, ""); // Ensure 4 digits
      setOtp(updatedOtp);

      // Move to next input if digit is valid
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Handle backspace for navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle OTP verification
  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);

    try {
      const response = await axios.post(
        `${envAPI_URL}auth/verifysignupotp`,
        { id: signupId, otp },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-7 mx-auto">
          <h3 className="display-6 sign-in-font mb-3">Enter OTP</h3>
          <p className="sign-up-text">
            Enter the OTP we just sent you on +91 9988776655
          </p>
          <div className="form-md">
            <div className="row-otp">
              {[0, 1, 2, 3].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={otp[index] || ""} // Display digit if available
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-label={`digit ${index + 1}`}
                />
              ))}
            </div>

            <div className="form-group mt-5">
              <button
                className="button btn btn-primary sign-in-btn w-100"
                type="button"
                onClick={verifyOtp}
              >
                Verify & Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
