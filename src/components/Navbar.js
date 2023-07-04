import React, { useEffect, useState } from "react";
import { Col, Container, Offcanvas, Row, Spinner } from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHome,
  faRightToBracket,
  faShoppingBasket,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import OffCanvas from "./offcanvas";
import Badge from "react-bootstrap/Badge";

const Navbar = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [itemAmounts, setItemAmounts] = useState(0);
  const [thenumber, setThenumber] = useState(null);
  const [showBadge, setShowBadge] = useState(false);
  const [profile, setProfile] = useState(null);
  const [leftNav, setLeftNav] = useState(false);

  useEffect(() => {
    const storedStore = localStorage.getItem("store");
    const item = JSON.parse(storedStore);
    item && setThenumber(item.reduce((total, item) => total + item.amount, 0));
    if (localStorage.getItem("token") != 0) {
      setIsLoading(false);
      props.loginState(true);
    }
  }, []);

  const req = async () => {
    props.loginState(true);
    setLoading(true);
    await axios
      .get("http://kzico.runflare.run/user/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        // setIsLoading(true);
        // setLoading(false);
        localStorage.setItem("token", "0");
        props.ifLoggedin(false);
      });

    setLoading(false);
  };
  useEffect(() => {
    if (isLoading == false) {
      req();
    }
  }, [isLoading]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem("phone", profile.user.mobile);
    }
  }, [profile]);

  useEffect(() => {
    if (props.Data) {
      setIsLoading(false);
    }
  }, [props.Data]);

  useEffect(() => {
    if (props.loading) {
      setIsLoading(false);
      setLoading(true);
      console.log("this");
    }
  }, [props.loading]);

  useEffect(() => {
    if (props.loading2) {
      setLoading(false);
      setIsLoading(true);
      console.log("that");
    }
  }, [props.loading2]);

  useEffect(() => {
    if (props.amount) {
      setItemAmounts(itemAmounts + 1);
      setShowBadge(true);
    }
  }, [props.amount]);

  useEffect(() => {
    if (props.amount2) {
      setThenumber(0);
    }
  }, [props.amount2]);

  useEffect(() => {
    if (thenumber != null && props.removed) {
      setThenumber(thenumber - 1);
    }
  }, [props.removed]);
  useEffect(() => {
    if (profile) {
      console.log(profile);
    }
  }, [profile]);
  useEffect(() => {
    if (itemAmounts) {
      const storedData = localStorage.getItem("store");
      const item = JSON.parse(storedData);
      setThenumber(item.reduce((total, item) => total + item.amount, 0));
    }
  }, [itemAmounts]);

  const handleConfirmLogout = () => {
    setIsLoading(true);
    localStorage.setItem("token", "0");
    localStorage.setItem("phone", "0");
  };

  const handleNoticLogout = () => {
    props.loginState(null);
  };

  const showNav = () => {
    setLeftNav((current) => !current);
  };
  const showNav2 = () => {
    setLeftNav(false);
  };
  return (
    <div>
      <FontAwesomeIcon
        onClick={showNav}
        className="list-icon"
        icon={faBars}
      ></FontAwesomeIcon>

      <div className="top-nav">
        <Container fluid>
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Col md={2} lg={2} xl={2} xxl={2}>
              <Link to="/" title="Home page" className="nav-btn" href="#">
                Home
              </Link>
            </Col>
            <Col
              md={{ span: 1, offset: 7 }}
              lg={{ span: 1, offset: 7 }}
              xl={{ span: 1, offset: 7 }}
              xxl={{ span: 1, offset: 7 }}
            >
              <Link to="/cart" title="Checkout" className="nav-btn" href="#">
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>

                {thenumber > 0 && (
                  <Badge
                    style={{
                      fontSize: "10px",
                      borderRadius: "50%",
                      top: "30%",
                      transform: "translateX(-190%)",
                    }}
                    bg="danger"
                  >
                    {thenumber}
                  </Badge>
                )}
              </Link>
            </Col>
            <Col className="email-nav">
              {isLoading || profile == null ? (
                // <p>login</p>
                <Link to="/login" title="Log In" className="nav-btn" href="#">
                  login
                </Link>
              ) : loading ? (
                <span className="loader"></span>
              ) : (
                <>
                  {["end"].map((placement, idx) => (
                    <OffCanvas
                      handleNoticLogout={handleNoticLogout}
                      handleConfirmLogout={handleConfirmLogout}
                      key={idx}
                      placement={placement}
                      title={profile && profile.user.email}
                      name={profile && profile.user.email}
                    />
                  ))}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <nav
        className="navbar"
        style={{ transform: leftNav ? "translate(0)" : "translate(-100%)" }}
      >
        <div className="navbar-header">
          <FontAwesomeIcon
            onClick={showNav}
            className="nav-close"
            icon={faXmark}
          />
          <div className="left-nav-email">
            {["end"].map((placement, idx) => (
              <div key={idx} onClick={showNav2}>
                <OffCanvas
                  handleNoticLogout={handleNoticLogout}
                  handleConfirmLogout={handleConfirmLogout}
                  key={idx}
                  placement={placement}
                  title={profile && profile.user.email}
                  name={profile && profile.user.email}
                />
              </div>
            ))}
          </div>
        </div>
        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-link" title="Home page">
              <FontAwesomeIcon
                className="navbar-icons"
                icon={faHome}
              ></FontAwesomeIcon>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link" title="checkout">
              <FontAwesomeIcon
                className="navbar-icons"
                icon={faCartShopping}
              ></FontAwesomeIcon>
              {thenumber > 0 && (
                <Badge
                  style={{
                    fontSize: "10px",
                    borderRadius: "50%",
                    top: "30%",
                    transform: "translateX(-40%)",
                  }}
                  bg="danger"
                >
                  {thenumber}
                </Badge>
              )}
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link" title="Email">
              <FontAwesomeIcon
                className="navbar-icons"
                icon={faRightToBracket}
              ></FontAwesomeIcon>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
