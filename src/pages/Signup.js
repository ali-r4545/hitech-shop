import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";




const Signup = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userName, setUserName] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const signUp = async () => {
    function check(password, confirmPassword, mobile, email, userName) {

      if (userName == null || userName == "") {
        setErrorMessage('please enter user name');
        return false;
      }


      if (email == null  || email == "") {
        setErrorMessage('please enter email');
        return false;
      }



      if (password == null || password == "") {
        setErrorMessage('please enter password');
        return false;
      }

      if (confirmPassword == null || confirmPassword == "") {
        setErrorMessage('please enter confirm password');
        return false;
      }


      if (mobile == null || mobile == "") {
        setErrorMessage('please enter mobile phone');
        return false;
      }


      if (password.indexOf('#') === -1) {
        setErrorMessage('The password must contain a #');
        return false;
      }


      if (!/[A-Z]/.test(password)) {
        setErrorMessage('The password must contain at least one uppercase letter');
        return false;
      }


      if (!/[a-z]/.test(password)) {
        setErrorMessage('The password must contain at least one lowercase letter');
        return false;
      }


      if (!/\d/.test(password)) {
        setErrorMessage('The password must contain at least one number');
        return false;
      }


      if (password.length < 8) {
        setErrorMessage('The password must be longer than 8 characters');
        return false;
      }
      if (new RegExp(`^${password}$`).test(confirmPassword) == false) {
        setErrorMessage('The password is not confirmed correctly');
        return false;
      }


      if (userName.length < 5) {
        setErrorMessage('User name should be 5 or more charecters ');
        return false;
      }

      if (mobile.length != 11) {
        setErrorMessage('Phone number should be 11 numbers');
        return false;
      }
      if (/^\d+$/.test(mobile) == false) {
        setErrorMessage('Phone number should be numbers');
        return false;
      }

      if (/@/.test(email) == false && /\.[a-zA-Z]{2,}$/.test(email) == false) {
        setErrorMessage('Invalid email address');
        return false;
      }



      return true;
    }


    if (check(password, confirmPassword, mobile, email, userName)) {
      try {
        const { data } = await axios.post(
          "http://kzico.runflare.run/user/signup",
          {
            username: userName,
            email: email,
            password: password,
            mobile: mobile,
            // confirmPassword: confirmPassword,
          }
        );
        console.log(data);
        setShowRejex(true)
        setErrorMessage("you have succesfully signed up")
      } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data.message);
        setShowRejex(true)
      }
    } else {
      setShowRejex(true);
    }
  };


  const handleHide = () => {
    setShowRejex(false);
  }



  const handleUsertName = (event) => {
    setUserName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleMobile = (event) => {
    setMobile(event.target.value);
  };
  return (
    <div>

      <div className="signup-container">
        <p className="form-header">SIGN UP</p>
        <div className="signup-form">
          <div className="inputBox">
            <input
              onChange={handleUsertName}
              className="single-form"
              required="required"
              type="text"
            />
            <span>UserName</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              onChange={handleEmail}
              className="single-form"
              required="required"
              type="text"
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              onChange={handlePassword}
              className="single-form"
              required="required"
              type="password"
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              onChange={handleConfirmPassword}
              className="single-form"
              required="required"
              type="password"
            />
            <span>Confirm Password</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              onChange={handleMobile}
              className="single-form"
              required="required"
              type="text"
            />
            <span>Phone Number</span>
            <i></i>
          </div>
          <div className="buttons">
            <button onClick={signUp} className="signup-btn">
              sign up
            </button>
          </div>
        </div>
      </div>





      <Modal show={showRejex} onHide={handleHide}>
        <Modal.Header closeButton>
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

export default Signup;
