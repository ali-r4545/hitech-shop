import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="banner">
          <h1>welcome to tech shop</h1>
          <h2>you can find many products here</h2>
          <h3>lets have a look for more</h3>
          <a className="banner-btn" href="#explore">
            Explore
          </a>
        </div>
        <div className="hover">
          <button className="scroll-icon">
            <div className="scroll"> </div>
          </button>
        </div>
      </header>
      <div className="content-divider"></div>
    </div>
  );
};

export default Header;
