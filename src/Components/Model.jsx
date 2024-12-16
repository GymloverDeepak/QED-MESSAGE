import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Components/Model.css";

const Modal = ({ show, onClose, signupId, title, message }) => {
  const envAPI_URL = import.meta.env.VITE_API_URL;
  const [bio, setBio] = useState(""); // State to store bio input
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

  if (!show) return null;

  const handleUpdateBio = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await axios.post(
        `${envAPI_URL}auth/updatesignupbio`,
        { id: signupId, bio },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.status === 201) {
        alert("Bio Updated successfully!");
        navigate("/home");
      } else {
        setError(response.data.message || "Failed to update bio."); // Show API error
      }
    } catch (error) {
      console.error("Error during Bio update:", error.message);
      setError(
        error.response?.data?.message || "An unexpected error occurred." // Show API or generic error
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h4>{title}</h4>
        <p>{message}</p>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Update your bio"
        />
        {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={handleUpdateBio}>
            Update Bio
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Skip Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
