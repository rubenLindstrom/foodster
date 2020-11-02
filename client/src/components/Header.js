import React from "react";
import "./Header.css";

import logo from "../img/icon.png";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="" />
    </div>
  );
};

export default Header;
