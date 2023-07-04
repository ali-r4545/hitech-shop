import React, { useState, useEffect } from "react";
import axios from "axios";
import { productRetreaved } from "../redux/actionCreaters";
import { Link } from "react-router-dom";
import "./checkout.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";



const CheckOut = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [city] = useState(localStorage.getItem("selectedCity") || "");
  const [address] = useState(localStorage.getItem("address") || "");
  const [postalCode] = useState(localStorage.getItem("postalCode") || "");
  const [phoneNumber] = useState(localStorage.getItem("phoneNumber") || "");
  const [totalPrice] = useState(localStorage.getItem("totalPrice"));
  const [itemList, setItemList] = useState(null);
  const [ifSubmited, setIfSubmited] = useState(null);
  const [vipeCart, setVipeCart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Credit card");
  const [error, setError] = useState("");
  const store = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);



  const req = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://kzico.runflare.run/product/");
      setData(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // axios
    //   .get("http://kzico.runflare.run/product/")
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error fetching data:", error);
    //   });
    req();
    const storedData = localStorage.getItem("store");

    dispatch(productRetreaved(JSON.parse(storedData)));
  }, []);


  const handleHide = () => {
    setShowRejex(false);

  };

  useEffect(() => {
    if (data) {
      let info = [];
      for (let i = 0; i < store.length; i++) {
        info = [...info, data.find((obj) => obj._id == store[i]?.productId)];
      }
      setCartItems(info);

      setItemList(
        store.map((obj) => {
          return {
            product: obj.productId,
            qty: obj.amount,
          };
        })
      );
    }
  }, [data]);

  useEffect(() => {
    if (vipeCart) {
      let info = [];
      for (let i = 0; i < store.length; i++) {
        info = [...info, data.find((obj) => obj._id == store[i]?.productId)];
      }
      setCartItems(info);
    }
  }, [vipeCart]);

  const handleCheckout = () => {
    try {
      setIfSubmited(
        axios.post(
          "http://kzico.runflare.run/order/submit",
          {
            orderItems: itemList,
            shippingAddress: {
              address: address,
              city: city,
              postalCode: postalCode,
              phone: phoneNumber,
            },
            paymentMethod: paymentMethod,
            shippingPrice: 5,
            totalPrice: totalPrice,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
      );
      localStorage.setItem("postalCode", "");
      localStorage.setItem("selectedCity", "");
      localStorage.setItem("phoneNumber", "");
      localStorage.setItem("address", "");
      setErrorMessage("you have succesfully submited your purchase");
      setShowRejex(true);

    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (ifSubmited) {
      dispatch(productRetreaved([]));
      setVipeCart(true);
      props.setTheAmountZero(true);
      console.log(ifSubmited);
    }
  }, [ifSubmited]);

  useEffect(() => {
    if (vipeCart) {
      localStorage.setItem("store", JSON.stringify(store));
    }
  }, [vipeCart]);

  const togglePaymentMethod = (e) => {
    if (e.target.value == 1) setPaymentMethod("Credit card");
    else setPaymentMethod("cash");
  };

  return (
    <div>
      {loading ? (
        <Row>
          <span className="loader"></span>
        </Row>
      ) : (
        <>
          <Container>
            <Row>
              {cartItems &&
                cartItems.map((x) => {
                  return (
                    <Col
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={4}
                      style={{
                        marginTop: "2rem",
                        marginBottom: "-3rem",
                      }}
                    >
                      <div className="cart-product-container">
                        <div
                          className="checkout-card"
                          to={"/product?id=" + x._id}
                        >
                          <img className="cart-image" src={x.image} />
                          <div className="cart-info">
                            <p>price: {x.price}$</p>
                            <p>Color: {x.color}</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </Container>

          {cartItems.length > 0 && (
            <div className="address-information">
              <p>
                <FontAwesomeIcon
                  className="location-icon"
                  icon={faLocationDot}
                ></FontAwesomeIcon>{" "}
                Address: {address}
              </p>
            </div>
          )}

          <div className="payment">
            {/* <Form.Select
          onChange={togglePaymentMethod}
          aria-label="Default select example"
        >
          <option value="1">Credit card</option>
          <option value="2">Cash</option>
        </Form.Select> */}
            {cartItems.length > 0 &&
              <div onChange={togglePaymentMethod} className="radio-input">
                <input type="radio" id="value-1" name="value-radio" value="1" />
                <label for="value-1">Credit Card</label>
                <input type="radio" id="value-2" name="value-radio" value="2" />
                <label for="value-2">Cash</label>
              </div>
            }

          </div>

          <div className="checkout-buttons">
            {cartItems.length > 0 &&
              <Link to={"/cart"}>
                {/* <button className="btn btn-primary">edit</button> */}
                <button className="button">
                  <span className="button-content">Edit </span>
                </button>
              </Link>

            }
            {store.length > 0 && itemList && (
              <div>
                {/* <button onClick={handleCheckout} className="btn btn-primary">
                  Submit
                </button> */}
                <button onClick={handleCheckout} className="button">
                  <span className="button-content">Submit </span>
                </button>
              </div>
            )}
          </div>
        </>
      )}



      <Modal show={showRejex}>
        <Modal.Header>
          <Modal.Title>message</Modal.Title>
        </Modal.Header>
        <Modal.Body> {errorMessage} </Modal.Body>
        <Modal.Footer>
          <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
            <Button variant="secondary" onClick={handleHide}>
              Close
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>



    </div>
  );
};
export default CheckOut;
