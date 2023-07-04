import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Offcanvas } from "react-bootstrap";
import "./offcanvas.css";

export default function OffCanvas({
  handleNoticLogout,
  handleConfirmLogout,
  title,
  name,
  ...props
}) {
  const [show, setShow] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDoLogout = () => {
    setShowLogout(false);
    handleConfirmLogout();
    handleNoticLogout();
  };
  const handleCloseLogout = () => {
    setShowLogout(false);
  };

  const handleLogout = () => {
    setShowLogout(true);
  };

  return (
    <>
      <a className="gmail" onClick={handleShow}>
        {name}
      </a>
      <Offcanvas
        className="right-nav-container"
        show={show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="right-nav-header">
            {" "}
            {title}{" "}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/profile"}
            >
              <ListGroup.Item
                className="right-nav-list-item"
                onClick={handleClose}
                action
              >
                Profile
              </ListGroup.Item>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/orders"}
            >
              <ListGroup.Item
                className="right-nav-list-item"
                onClick={handleClose}
                action
              >
                Orders
              </ListGroup.Item>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/:setting/changeProfile"}
            >
              <ListGroup.Item
                className="right-nav-list-item"
                onClick={handleClose}
                action
              >
                Setting
              </ListGroup.Item>
            </Link>
            <ListGroup.Item
              className="right-nav-list-item"
              onClick={handleLogout}
              action
            >
              Log out
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={showLogout} onHide={handleLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogout}>
            Close
          </Button>
          <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
            <Button variant="primary" onClick={handleDoLogout}>
              log out
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}
