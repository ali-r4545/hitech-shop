import React, { useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Setting_uploadAvatar.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";


const Setting_uploadAvatar = () => {
  const [pic, setPic] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);



  const handleReq = async () => {
    setSuccess(null);
    const formData = new FormData();
    formData.append("profile-image", pic);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setSuccess(success + 1)
      setErrorMessage("Uploaded successfuly");
      setShowRejex(true);
    
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
      setShowRejex(true);
    }
  };

 
  const handleHide = () => {
    setShowRejex(false);
  }



  const handleFile = (event) => {
    setPic(event.target.files[0]);
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
            <Link to={"/:setting/changePassword"}>
              <ListGroup.Item action>Change password</ListGroup.Item>
            </Link>
            <Link>
              <ListGroup.Item action active>
                Upload Avatar
              </ListGroup.Item>
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
        Upload Avatar
      </p>
      <div className="upload-contain">
        <input onChange={handleFile} className="file-upload-input" type="file" />
        <div>
          <button className="icon-btn add-btn">
            <div className="add-icon"></div>
            <div onClick={handleReq} className="btn-txt">Add Photo</div>
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
 </>
 );
};

export default Setting_uploadAvatar;
