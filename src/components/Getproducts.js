import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Pagination,
  Row,
} from "react-bootstrap";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Getproducts.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";

const Getproducts = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [paginate, setPaginate] = useState([]);
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState("");
  const header = useRef();

  const req = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://kzico.runflare.run/product/");

      const array = [];
      for (var i = 1; i <= data.length / 5; i++) {
        array.push(i);
      }
      setPaginate(array);
      setProduct(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    req();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: page > 1 ? header?.current?.offsetTop - 50 : 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <div>
      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col
            xxs={{ span: 1, offset: 1 }}
            xs={{ span: 1, offset: 1 }}
            sm={{ span: 1, offset: 1 }}
            md={{ span: 4, offset: 3 }}
          >
            <FormControl
              id="explore"
              className="search-input"
              ref={header}
              type="search"
              onChange={(e) => setText(e.target.value)}
            />
          </Col>
          <Col
            xs={{ span: 1, offset: 2 }}
            sm={{ span: 1, offset: 3 }}
            md={{ span: 1, offset: 1 }}
          >
            <Button
              onClick={() => {
                setSearch(text);
                setPage(1);
              }}
              className="search-button"
              variant="info"
              type="submit"
            >
              <span className="button-text">search</span>
            </Button>
          </Col>
          <Col
            xs={{ span: 1, offset: 1 }}
            sm={{ span: 2, offset: 1 }}
            md={{ span: 2, offset: 1 }}
            style={{
              marginTop: "-1rem",
              marginLeft: "60px",
              fontSize: "12px",
            }}
          >
            <label>
              sort by:
              <Form.Select
                className="sort-btn"
                onChange={(e) => setSelect(e.target.value)}
              >
                <option>Higher</option>
                <option>Lower</option>
              </Form.Select>
            </label>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          {loading ? (
            <span className="loader"></span>
          ) : error ? (
            <p className="er-message">
              <Badge bg="danger">{error}</Badge>
            </p>
          ) : (
            product
              .filter(
                (item) =>
                  item.brand.toLowerCase().includes(search.toLowerCase()) ||
                  item.name.toLowerCase().includes(search.toLowerCase())
              )
              .sort((x, y) => {
                switch (select) {
                  case "Higher":
                    return y.price - x.price;
                  case "Lower":
                    return x.price - y.price;
                }
              })
              .slice((page - 1) * 5, page * 5)
              .map((item) => {
                return (
                  <Col
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    xs={6}
                    sm={4}
                    md={4}
                    lg={6}
                    xl={4}
                    xxl={4}
                    key={item._id}
                  >
                    <Link to={"/product?id=" + item._id} className="products">
                      <div className="product-card">
                        <div className="product-picture-container">
                          <img
                            alt="single product"
                            className="product-img"
                            src={item.image}
                          ></img>
                          <span className="brand">{item.brand}</span>
                        </div>

                        <p className="product-name">{item.name}</p>
                        <p className="countInStock">
                          {item.countInStock == 0
                            ? "out of stock"
                            : item.countInStock}
                        </p>
                        <Container fluid>
                          <Row className="p-r" fluid>
                            <Col>
                              <p
                                style={{ textAlign: "left" }}
                                className="price"
                              >
                                price: {item.price}$
                              </p>
                            </Col>
                            <Col>
                              <p
                                style={{ textAlign: "right" }}
                                className="main-rating"
                              >
                                <FontAwesomeIcon
                                  style={{ color: "#f9bc00" }}
                                  icon={faStar}
                                ></FontAwesomeIcon>{" "}
                                {item.rating}
                              </p>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </Link>
                  </Col>
                );
              })
          )}
        </Row>
      </Container>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Pagination size="sm">
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev
            onClick={() => {
              if (page > 1) {
                setPage((L) => L - 1);
              }
            }}
          />
          {paginate.map((item, index) => (
            <Pagination.Item
              key={index}
              active={page === item}
              onClick={() => setPage(item)}
            >
              {item}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => {
              if (page < paginate.length) {
                setPage((L) => L + 1);
              }
            }}
          />
          <Pagination.Last onClick={() => setPage(paginate.length)} />
        </Pagination>
      </div>
      <Footer />
      <div className="top">
        <button
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
          className="back-to-top"
        >
          <div className="text">
            <span>Back</span>
            <span>to</span>
            <span>top</span>
          </div>
          <div className="clone">
            <span>Back</span>
            <span>to</span>
            <span>top</span>
          </div>
          <svg
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Getproducts;
