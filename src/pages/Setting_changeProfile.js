import React, { useState , useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./setting_changeProfile.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
const Setting_changeProfile = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [city, setCity] = useState(null);
  const [data, setData] = useState(null);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);



  const handleReq = async () => {
    function check(firstName, lastName, gender, age, city) {
      if (firstName == null) {
        setErrorMessage('Please enter First name');
        return false;
      }
      if (lastName == null) {
        setErrorMessage('Please enter last name');
        return false;
      }
      if (gender == null) {
        setErrorMessage('Please enter gender');
        return false;
      }
      if (age == null) {
        setErrorMessage('Please enter age');
        return false;
      }
      if (city == null) {
        setErrorMessage('Please enter city name');
        return false;
      }


      if (firstName.length < 3) {
        setErrorMessage('First name must be longer than 3 characters');
        return false;
      }
      if (lastName.length < 3) {
        setErrorMessage('Last name must be longer than 3 characters');
        return false;
      }


      if (city.length < 3) {
        setErrorMessage('City name must be longer than 3 characters');
        return false;
      }

      if (/^\d+$/.test(age) == false) {
        setErrorMessage('Age should be numbers');
        return false;
      }

      if (/^(male|female)$/i.test(gender) == false) {
        setErrorMessage('gender should be either male or female');
        return false;
      }



      return true;
    }


    if (check(firstName, lastName, gender, age, city)) {
      try {
        setData(
          await axios.put(
            "http://kzico.runflare.run/user/change-profile",
            {
              firstname: firstName,
              lastname: lastName,
              gender: gender,
              age: age,
              city: city,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
        );
        setShowRejex(true)
        setErrorMessage("you have succesfully changed your profile")
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setShowRejex(true)
      }
    } else {
      setShowRejex(true)
    }
  };


  const handleHide = () => {
    setShowRejex(false);
  }

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);


  const handleFirstname = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastname = (event) => {
    setLastName(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleAge = (event) => {
    setAge(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  
  
  
  
  return (
<>


    <div className="contain">
      <Col lg={3} md={3} sm={3} xl={3} xs="auto" xxl={3}>
        <div className="search-bar">
          <ListGroup>
            <ListGroup.Item>Setting Bar</ListGroup.Item>
            <ListGroup.Item action active>
              Change profile
            </ListGroup.Item>
            <Link to={"/:setting/changePassword"}>
              <ListGroup.Item action>Change password</ListGroup.Item>
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
        Change Profile
      </p>
      <div className="profile-contain">
        <div className="inputBox">
          <input onChange={handleFirstname} className="single-form" required="required" type="text" />
          <span>Firstname</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input onChange={handleLastname} className="single-form" required="required" type="text" />
          <span>Lastname</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input onChange={handleGender} className="single-form" required="required" type="text" />
          <span>Gender</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input onChange={handleAge} className="single-form" required="required" type="text" />
          <span>Age</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input onChange={handleCity} className="single-form" required="required" type="text" />
          <span>City</span>
          <i></i>
        </div>
        <a onClick={handleReq} href="#" className="done-button">
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

export default Setting_changeProfile;
