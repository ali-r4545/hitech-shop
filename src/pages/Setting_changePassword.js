import React, { useState , useEffect} from "react";
import "./Setting_changePassword.css";
import { Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";

const Setting_changePassword = () => {

  const [lastpassword, setLastpassword] = useState(null);
  const [newpassword, setNewPassword] = useState(null);
  const [data, setData] = useState(null);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleReq = async () => {
    function check(newpassword) {
      if ((newpassword && newpassword.indexOf('#') === -1)) {
        setErrorMessage('The password must contain a #');
        return false;
      }


      if (!/[A-Z]/.test(newpassword)) {
        setErrorMessage('The password must contain at least one uppercase letter');
        return false;
      }


      if (!/[a-z]/.test(newpassword)) {
        setErrorMessage('The password must contain at least one lowercase letter');
        return false;
      }


      if (!/\d/.test(newpassword)) {
        setErrorMessage('The password must contain at least one number');
        return false;
      }


      if (newpassword.length < 8) {
        setErrorMessage('The password must be longer than 8 characters');
        return false;
      }


      return true;
    }


    if (check(newpassword)) {
      try {
        setData(
          await axios.put(
            "http://kzico.runflare.run/user/change-password",
            {
              old_password: lastpassword,
              new_password: newpassword,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
        );
        setShowRejex(true)
        setErrorMessage("you have succesfully changed your password")
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setShowRejex(true)
      }
    } else {
      setShowRejex(true)
    }
  };

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const handleHide = () => {
    setShowRejex(false);
  }

  const handleLastPassword = (event) => {
    setLastpassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };




  return (
    <>

      <div className="contain">

        <Col lg={3} md={3} sm={3} xl={3} xs="auto" xxl={3}>
          <div className="search-bar">
            <ListGroup>
              <ListGroup.Item>Setting Bar</ListGroup.Item>
              <Link to={"/:setting/changeProfile"}>
                <ListGroup.Item action>Change profile</ListGroup.Item>
              </Link>
              <Link>
                <ListGroup.Item action active>
                  Change password
                </ListGroup.Item>
              </Link>
              <Link to={"/:setting/uploadAvatar"}>
                <ListGroup.Item action>Upload Avatar</ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        </Col>
        <p
          style={{
            top: "15%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%,-50%)",
          }}
          className="form-header"
        >
          Change Password
        </p>
        <div className="profile-contain">
          <div className="inputBox">
            <input onChange={handleLastPassword} className="single-form" required="required" type="text" />
            <span>Old Password</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input   onChange={handleNewPassword} className="single-form" required="required" type="text" />
            <span>New Password</span>
            <i></i>
          </div>
          <a  onClick={handleReq} href="#" className="done-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Done
          </a>
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
    </>
  );
};

export default Setting_changePassword;
