import React, { useState, useEffect } from "react";
import "./Address.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const Address = () => {
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("selectedCity") || ""
  );
  const [postalCode, setPostalCode] = useState(
    localStorage.getItem("postalCode") || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber") || ""
  );
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allowed, setAllowed] = useState(null);




  useEffect(() => {
   if((postalCode && phoneNumber && address && selectedCity) || postalCode == (null || "") || phoneNumber == (null || "") || address == (null || "") || selectedCity == (null || "") ) {
    function check(postalCode, phoneNumber, address, selectedCity) {
      console.log(selectedCity);

      if (selectedCity.length < 3) {
        setErrorMessage("city name should be more than 3  charecters ");
        return false;
      }

      if (postalCode.length != 10) {
        setErrorMessage("postal code should be 10 numbers");
        return false;
      }

      if (address.length < 10) {
        setErrorMessage("address should be more than 10  charecters ");
        return false;
      }

      if (phoneNumber.length != 11) {
        setErrorMessage("Phone number should be 11 numbers");
        return false;
      }
      if (/^\d+$/.test(phoneNumber) == false) {
        setErrorMessage("Phone number should be numbers");
        return false;
      }

      if (phoneNumber != localStorage.getItem("phone")) {
        setErrorMessage("phone number must be the one you singnedup with");
        return false;
      }

      return true;
    }
  


    if (check(postalCode, phoneNumber, address, selectedCity)) {
      setAllowed(true);
      console.log(allowed);
    }
    else {
      setAllowed(false)
    }
  }
   


  }, [postalCode, phoneNumber, address, selectedCity]);




  const handleAllowNext = () => {  
      setShowRejex(true);
  };

  const handleHide = () => {
    setShowRejex(false);
  };

  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  useEffect(() => {
    localStorage.setItem("postalCode", postalCode);
  }, [postalCode]);

  const handlePostalCode = (e) => {
    const code = e.target.value;
    setPostalCode(code);
  };

  useEffect(() => {
    localStorage.setItem("phoneNumber", phoneNumber);
  }, [phoneNumber]);

  const handlePhoneNumber = (e) => {
    const phone = e.target.value;
    setPhoneNumber(phone);
  };

  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);

  const handleAddress = (e) => {
    const theAddress = e.target.value;
    setAddress(theAddress);
  };
  return (
    <div>
      <div className="address-form">
        <p className="form-header">Address Form</p>
        <form className="forms">
          <div className="inputBox">
            <input
              value={selectedCity}
              onChange={handleCityChange}
              required="required"
              type="text"
              className="single-form"
            ></input>
            <span>city name</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              value={address}
              onChange={handleAddress}
              required="required"
              type="text"
              className="single-form"
            ></input>
            <span>Address</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              value={postalCode}
              onChange={handlePostalCode}
              required="required"
              type="text"
              className="single-form"
            ></input>
            <span>Postal Code</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              value={phoneNumber}
              onChange={handlePhoneNumber}
              required="required"
              type="text"
              className="single-form"
            ></input>
            <span>PhoneNumber</span>
            <i></i>
          </div>
          <Link
            style={{ textDecoration: "none", position: "relative", top: "40%" }}
            to={allowed && "/checkout"}
          >
            <button onClick={handleAllowNext} className="cta">
              <span>NEXT</span>
              <svg viewBox="0 2 13 7" height="15px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </Link>
        </form>
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

export default Address;
