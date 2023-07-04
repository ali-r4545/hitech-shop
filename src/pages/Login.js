import React, { useState, useEffect, useRef } from "react";
import "./Login.css";

import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [data, setData] = useState(null);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReq = async () => {
    function check(password, emailAddress) {

      if (emailAddress == null || emailAddress == "") {
        setErrorMessage('please enter email address');
        return false;
      }


      if (password == null || password == "") {
        setErrorMessage('please enter password');
        return false;
      }


      return true;
    }





    if (check(password, emailAddress)) {
      props.setTheLoading(true);
      try {
        setData(
          await axios.post("http://kzico.runflare.run/user/login", {
            email: emailAddress,
            password: password,
          })
        );
        setErrorMessage("you have succesfully singed in");
        setShowRejex(true);
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setShowRejex(true);
      }
      props.setTheLoading2(false);

    } else {
      setShowRejex(true);
    }
  };

  const handleHide = () => {
    setShowRejex(false);

  };

  const handleEmail = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.data.user.token);
      props.setTheData(data);
    }
  }, [data]);
  return (
    <div>

      <div className="login-container">
        <p className="form-header">LOG IN</p>
        <div className="login-form">
          <div className="inputBox">
            <input
              required="required"
              onChange={handleEmail}
              type="text"
              className="single-form"
            />
            <span>Email/UserName</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              onChange={handlePassword}
              required="required"
              type="password"
              className="single-form"
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="buttons">
            <button onClick={handleReq} className="login-btn">
              log in
            </button>
            <Link to="/signup" className="login-btn">
              sign up
            </Link>
          </div>
        </div>
      </div>


      <Modal show={showRejex} onHide={handleHide}>
        <Modal.Header>
          <Modal.Title>message</Modal.Title>
        </Modal.Header>
        <Modal.Body> {errorMessage} </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleHide}>
              Close
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
