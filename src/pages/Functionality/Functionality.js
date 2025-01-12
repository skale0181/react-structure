import React from "react";
import { Link } from "react-router-dom";

const Functionality = () => {
  return (
    <>
      <h1>Functionality</h1>
      {/* list in that mention functionality links to go there page */}
      <ul>
        <li>
          <Link to="/loading-and-snackbar">loading and snackbar</Link>{" "}
        </li>
        <li>
          <Link to="/">MyLogo</Link>{" "}
        </li>
        <li>
          <Link to="/">MyLogo</Link>{" "}
        </li>
      </ul>
    </>
  );
};

export default Functionality;
