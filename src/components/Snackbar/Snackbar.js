// Snackbar.js
import React from "react";
import "./Snackbar.css";

const Snackbar = ({ message,type }) => {
    //type = success or error or warning
  return (
      <div className={`snackbar ${type}`}>
        {message}
      </div>
  );
};

export default Snackbar;