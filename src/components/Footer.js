import React from "react";
import "../components/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="social-icons">
          <a
            target="_blank"
            className="social-icon"
            href="https://www.instagram.com"
          >
            <FontAwesomeIcon className="awesome-icon" icon={faInstagram} />
          </a>
          <a
            target="_blank"
            className="social-icon"
            href="https://www.tweeter.com"
          >
            <FontAwesomeIcon className="awesome-icon" icon={faTwitter} />
          </a>
          <a
            target="_blank"
            className="social-icon"
            href="https://www.facebook.com"
          >
            <FontAwesomeIcon className="awesome-icon" icon={faFacebook} />
          </a>
        </div>
        <h4 className="footer-text">
          &copy;
          <span>2023</span>
          <span className="company"> KZI.CO </span>
          all rights reserved
        </h4>
      </footer>
    </div>
  );
};

export default Footer;
