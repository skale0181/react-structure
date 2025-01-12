import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Optional styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">MyLogo</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/functionality">Functionality</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
