import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";
import {
  productIncremented,
  productReducted,
  productRemoved,
  productRetreaved,
} from "../redux/actionCreaters";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Row } from "react-bootstrap";

const StoreCart = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState(null);
  const [loginData, setLoginData] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [amount, setAmount] = useState(null);
  const [removed, setRemoved] = useState(null);
  const [consoleLogStore, setConsoleLogStore] = useState(null);
  const store = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const req = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://kzico.runflare.run/product/");
      setData(data);
    } catch (error) {
      setError(error.message);
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
  }, []);

  useEffect(() => {
    if (props.loginData) {
      setLoginData(true);
    }

    if (props.loginData == null) setLoginData(false);
  }, [props.loginData]);

  useEffect(() => {
    if (data) {
      let info = [];
      for (let i = 0; i < store.length; i++) {
        info = [...info, data.find((obj) => obj._id == store[i]?.productId)];
      }
      setCartItems(info);

      const storedData = localStorage.getItem("store");

      dispatch(productRetreaved(JSON.parse(storedData)));
    }
  }, [data]);

  useEffect(
    () => {
      if (store && data) {
        let info = [];
        for (let i = 0; i < store.length; i++) {
          info = [...info, data.find((obj) => obj._id == store[i]?.productId)];
        }
        setCartItems(info);
      }
    },
    [store],
    data
  );

  useEffect(() => {
    if (cartItems) {
      const getTotalAmountPrice = (productId) => {
        const amount = store.find((obj) => obj.productId === productId)?.amount;
        const price = cartItems.find((obj) => obj._id === productId)?.price;

        return amount && price ? amount * price : 0;
      };

      const totalAmountPrice = store.reduce((total, obj) => {
        const amountPrice = getTotalAmountPrice(obj.productId);
        return total + amountPrice;
      }, 0);

      setTotalPrice(totalAmountPrice);
    }
  }, [cartItems]);

  useEffect(() => {
    if (totalPrice) {
      localStorage.setItem("totalPrice", totalPrice);
    }
  }, [totalPrice]);

  const handleHide = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleNotLogedinAl = () => {
    setShowAlert(true);
  };

  const handleIncrement = (Id) => {
    setConsoleLogStore(consoleLogStore + 1);
    dispatch(productIncremented(Id));

    setAmount(store.find((obj) => obj.productId === Id).amount);
  };

  const handleReduction = (Id) => {
    setConsoleLogStore(consoleLogStore + 1);
    dispatch(productReducted(Id));

    setAmount(store.find((obj) => obj.productId === Id).amount);
  };

  const handleRemove = (Id) => {
    dispatch(productRemoved(Id));
    setAmount(0);
    setRemoved(removed + 1);
  };

  useEffect(() => {
    if (consoleLogStore) {
      localStorage.setItem("store", JSON.stringify(store));
      console.log("Store changed!", store);
    }
  }, [consoleLogStore]);

  useEffect(() => {
    if (removed) {
      localStorage.setItem("store", JSON.stringify(store));
      console.log("Store changed!", store);
    }

    props.setTheRemove(removed);
  }, [removed]);

  useEffect(() => {
    props.setTheAmount(amount);
  }, [amount]);

  return (
    <div>
      {loading ? (
        <Row>
          <span className="loader"></span>
        </Row>
      ) : (
        cartItems &&
        cartItems.map((x) => {
          return (
            <div className="cart-container">
              <div className="cart" to={"/product?id=" + x._id}>
                <img className="card-img" src={x.image} />
                <div className="info">
                  <p className="cart-product-name">Name:{x.name}</p>
                  <p className="cart-count">{x.countInStock}</p>
                  <p>price: {x.price}$</p>
                  <p>
                    <FontAwesomeIcon
                      style={{ color: "#f9bc00" }}
                      icon={faStar}
                    ></FontAwesomeIcon>
                    {x.rating}
                  </p>
                  <p>color: {x.color}</p>
                </div>
                <div>
                  <Button variant="light" className="cart-add-button">
                    {store.find((obj) => obj.productId == x._id) &&
                    store.find((obj) => obj.productId == x._id).amount == 1 ? (
                      <span onClick={() => handleRemove(x._id)} bg="danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    ) : (
                      <span onClick={() => handleReduction(x._id)}>-</span>
                    )}
                    {store.find((obj) => obj.productId == x._id) &&
                      store.find((obj) => obj.productId == x._id).amount}

                    {store.find((obj) => obj.productId == x._id) &&
                    store.find((obj) => obj.productId == x._id).amount <
                      x.countInStock ? (
                      <span onClick={() => handleIncrement(x._id)}>+</span>
                    ) : (
                      <span>out</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      )}

      <div>
        {loginData == false ? (
          // <button
          //   onClick={handleNotLogedinAl}
          //   style={{ position: "fixed", top: "90%", right: "6%" }}
          //   className="cssbuttons-io-button"
          // >
          //   NEXT
          //   <div className="icon">
          //     <svg
          //       height="24"
          //       width="24"
          //       viewBox="0 0 24 24"
          //       xmlns="http://www.w3.org/2000/svg"
          //     >
          //       <path d="M0 0h24v24H0z" fill="none"></path>
          //       <path
          //         d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
          //         fill="currentColor"
          //       ></path>
          //     </svg>
          //   </div>
          // </button>
          <button className="continue-button" onClick={handleNotLogedinAl}>
            <span>Continue</span>
            <svg
              width="34"
              height="34"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="37"
                cy="37"
                r="35.5"
                stroke="black"
                stroke-width="3"
              ></circle>
              <path
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                fill="black"
              ></path>
            </svg>
          </button>
        ) : store.length > 0 ? (
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/address"}
          >
            {/* <button
              style={{ position: "fixed", top: "90%", right: "6%" }}
              className="cssbuttons-io-button"
            >
              NEXT
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button> */}
            <button className="continue-button">
              <span>Continue</span>
              <svg
                width="34"
                height="34"
                viewBox="0 0 74 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="37"
                  cy="37"
                  r="35.5"
                  stroke="black"
                  stroke-width="3"
                ></circle>
                <path
                  d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                  fill="black"
                ></path>
              </svg>
            </button>
          </Link>
        ) : (
          <p> </p>
        )}
      </div>

      <div className="total-price">{totalPrice && totalPrice}$</div>

      <Modal show={showAlert} onHide={handleHide}>
        <Modal.Header>
          <Modal.Title>not Logged in</Modal.Title>
        </Modal.Header>
        <Modal.Body> you need to log in to proceed </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAlert}>
            Stay
          </Button>
          <Button variant="primary">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/login"}
            >
              log in
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default StoreCart;
