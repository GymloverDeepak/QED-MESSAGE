import React from "react";
import "../Components/Model.css";

const Modal = ({ show, onClose,updateBio, title, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h4>{title}</h4>
        <p>{message}</p>
        <button className="btn btn-primary" onClick={updateBio}>
          Update Bio
        </button>
        <button className="btn btn-primary" onClick={onClose}>
          Skip Now
        </button>
      </div>
    </div>
  );
};

export default Modal;
