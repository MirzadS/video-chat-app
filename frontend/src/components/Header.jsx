import React from "react";
import "../Styles/style.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="header__back">
          <i className="fas fa-angle-left"></i>
        </div>
        <h3>Video Chat</h3>
      </div>
    </div>
  );
};

export default Header;
