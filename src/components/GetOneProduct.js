import axios from "axios";
import React, { useEffect, useState } from "react";
import "./GetOneProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  productAdded,
  productIncremented,
  productReducted,
  productRemoved,
  productRetreaved,
} from "../redux/actionCreaters";
import ReactImageMagnify from "react-image-magnify";

const GetOneProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [variable, setVariable] = useState(false);
  const [removed, setRemoved] = useState(null);
  const [error, setError] = useState("");
  const [consoleLogStore, setConsoleLogStore] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);
  const store = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  // const req = async () => {
  //   setLoading(true);
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const name = queryParams.get("id");
  //   setName(name);
  //   axios
  //     .get("http://kzico.runflare.run/product/" + name)
  //     .then((response) => {
  //       setSingleProduct(response.data);
  //     })
  //     .catch((error) => {
  //       setError("Error fetching data:", error.message);
  //     });

  //   if (undefined == store.find((obj) => obj.productId === name)) {
  //     setAmount(0);
  //   } else {
  //     setAmount(store.find((obj) => obj.productId === name).amount);
  //   }

  //   setLoading(false);
  // };

  const req = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const name = queryParams.get("id");
      setName(name);
      const { data } = await axios.get(
        "http://kzico.runflare.run/product/" + name
      );
      setSingleProduct(data);
    } catch (error) {
      setError("Error fetching data:", error.message);
    }

    if (undefined == store.find((obj) => obj.productId === name)) {
      setAmount(0);
    } else {
      setAmount(store.find((obj) => obj.productId === name).amount);
    }

    setLoading(false);
  };

  useEffect(() => {
    req();
  }, []);

  const handleAdd = () => {
    setConsoleLogStore(consoleLogStore + 1);
    dispatch(productAdded(name));
  };

  const handleIncrement = () => {
    setConsoleLogStore(consoleLogStore + 1);
    dispatch(productIncremented(name));
  };

  const handleReduction = () => {
    setConsoleLogStore(consoleLogStore + 1);
    dispatch(productReducted(name));
  };

  const handleRemove = () => {
    dispatch(productRemoved(name));

    setAmount(0);
    setRemoved(removed + 1);
  };

  useEffect(() => {
    if (consoleLogStore) {
      localStorage.setItem("store", JSON.stringify(store));
      console.log("Store changed!", store);

      if (undefined == store.find((obj) => obj.productId === name).amount) {
        setAmount(0);
      } else {
        setAmount(store.find((obj) => obj.productId === name).amount);
      }
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

  useEffect(() => {
    setVariable(true);
  }, []);

  useEffect(() => {
    if (variable) {
      const storedData = localStorage.getItem("store");
      {
        storedData &&
          JSON.parse(storedData).find((obj) => obj.productId === name) &&
          setAmount(
            JSON.parse(storedData).find((obj) => obj.productId === name).amount
          );
      }

      {
        storedData && dispatch(productRetreaved(JSON.parse(storedData)));
      }
    }
  }, [variable]);

  return (
    <div>
      {loading ? (
        <Container>
          <Row>
            <span className="loader"></span>
          </Row>
        </Container>
      ) : error ? (
        <p className="er-message">
          <Badge bg="danger">{error}</Badge>
        </p>
      ) : (
        <>
          <div className="single-product-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ReactImageMagnify
                className="single-product-image"
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: singleProduct && singleProduct.image,
                  },
                  largeImage: {
                    src: singleProduct && singleProduct.image,
                    width: 600,
                    height: 600,
                  },
                  hoverDelayInMs: 0,
                  enlargedImageContainerStyle: {
                    marginLeft: "0%",
                    border: "none",
                    boxShadow: "0 20px 25px -8px rgb(0 0 0 / 0.1)",
                  },
                }}
              />

              <div class="rating">
                <input
                  value="star-1"
                  name="star-radio"
                  id="star-1"
                  type="radio"
                />
                <label for="star-1">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      pathLength="360"
                    ></path>
                  </svg>
                </label>
                <input
                  value="star-1"
                  name="star-radio"
                  id="star-2"
                  type="radio"
                />
                <label for="star-2">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      pathLength="360"
                    ></path>
                  </svg>
                </label>
                <input
                  value="star-1"
                  name="star-radio"
                  id="star-3"
                  type="radio"
                />
                <label for="star-3">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      pathLength="360"
                    ></path>
                  </svg>
                </label>
                <input
                  value="star-1"
                  name="star-radio"
                  id="star-4"
                  type="radio"
                />
                <label for="star-4">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      pathLength="360"
                    ></path>
                  </svg>
                </label>
                <input
                  value="star-1"
                  name="star-radio"
                  id="star-5"
                  type="radio"
                />
                <label for="star-5">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      pathLength="360"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
            <div className="single-product-info">
              <p>name: {singleProduct && singleProduct.name}</p>
              <p>brand: {singleProduct && singleProduct.brand}</p>
              <p>color: {singleProduct && singleProduct.color}</p>
              <p>price: {singleProduct && singleProduct.price}$</p>
              <p>
                rating:
                <FontAwesomeIcon
                  style={{ color: "#f9bc00" }}
                  icon={faStar}
                ></FontAwesomeIcon>{" "}
                {singleProduct && singleProduct.rating}
              </p>
              <p>{singleProduct && singleProduct.countInStock}</p>
              <p style={{ maxWidth: "40rem" }}>
                description: {singleProduct && singleProduct.description}
              </p>
            </div>
          </div>
          {amount > 0 ? (
            <div className="add-button">
              <button className="neg-pos-container">
                {amount == 1 ? (
                  <FontAwesomeIcon
                    onClick={handleRemove}
                    className="trash-badge"
                    icon={faTrash}
                  />
                ) : (
                  <span onClick={handleReduction}>-</span>
                )}
                {amount}

                {singleProduct && singleProduct.countInStock > amount ? (
                  <span onClick={handleIncrement}>+</span>
                ) : (
                  <span>out</span>
                )}
              </button>
            </div>
          ) : (
            <button className="add-to-card" onClick={handleAdd}>
              Add to Cart
            </button>
          )}
          <Footer />
        </>
      )}
    </div>
  );
};

export default GetOneProduct;
