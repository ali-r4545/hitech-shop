import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Address from "./pages/Address";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GetOneProduct from "./components/GetOneProduct";
import Setting_changeProfile from "./pages/Setting_changeProfile";
import Setting_changePassword from "./pages/Setting_changePassword";
import Setting_uploadAvatar from "./pages/Setting_uploadAvatar";
import Navbar from "./components/Navbar";
import StoreCart from "./pages/cart";
import Orders from "./pages/orders";
import NotFound from "./pages/notFound";
import OrdersInfo from "./pages/ordersInfo";
import CheckOut from "./pages/checkout";
import { useState, useEffect } from "react";
import Profile from "./pages/profile";
import LogedIn from "./pages/logedin";

const Router = () => {
  const [data, setData] = useState(null);
  const [removed, setRemoved] = useState(null);
  const [amount, setAmount] = useState(null);
  const [amount2, setAmount2] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [loading2, setLoading2] = useState(null);
  const [ifLogged, setIfLogged] = useState(false);

  const setTheRemove = (Data) => {
    setRemoved(Data);
  };
  const setTheAmount = (Data) => {
    setAmount(Data);
  };

  const loginState = (Data) => {
    setLoginData(Data);
  };

  const setTheData = (Data) => {
    setData(Data);
  };

  const setTheAmountZero = () => {
    setAmount2(amount2 + 1);
  };

  const setTheLoading = () => {
    setLoading(loading + 1);
  };

  const setTheLoading2 = () => {
    setLoading2(loading2 + 1);
  };

  const ifLoggedin = (Data) => {
    setIfLogged(Data);
  };

  useEffect(() => {
    if (parseFloat(localStorage.getItem("token")) !== 0) {
      setIfLogged(true);
    } else {
      setIfLogged(false);
    }
  }, []);

  useEffect(() => {
    if (parseFloat(localStorage.getItem("token")) !== 0) {
      setIfLogged(true);
    } else {
      setIfLogged(false);
    }
  }, [localStorage.getItem("token")]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar
          ifLoggedin={ifLoggedin}
          loading2={loading2}
          loading={loading}
          removed={removed}
          amount2={amount2}
          amount={amount}
          Data={data}
          loginState={loginState}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="address"
            element={loginData ? <Address /> : <NotFound />}
          />
          <Route
            path="login"
            element={
              ifLogged == false ? (
                <Login
                  ifLoggedin={ifLoggedin}
                  setTheLoading2={setTheLoading2}
                  setTheLoading={setTheLoading}
                  setTheData={setTheData}
                />
              ) : (
                <LogedIn />
              )
            }
          />
          <Route
            path="signup"
            element={ifLogged == false ? <Signup /> : <LogedIn />}
          />
          <Route
            path="/:productId"
            element={
              <GetOneProduct
                setTheRemove={setTheRemove}
                setTheAmount={setTheAmount}
              />
            }
          />
          <Route
            path="/:setting/changeProfile"
            element={loginData ? <Setting_changeProfile /> : <NotFound />}
          />
          <Route
            path="/:setting/changePassword"
            element={loginData ? <Setting_changePassword /> : <NotFound />}
          />
          <Route
            path="/:setting/uploadAvatar"
            element={loginData ? <Setting_uploadAvatar /> : <NotFound />}
          />
          <Route
            path="cart"
            element={
              <StoreCart
                loginData={loginData}
                setTheRemove={setTheRemove}
                setTheAmount={setTheAmount}
              />
            }
          />
          <Route
            path="orders"
            element={loginData ? <Orders /> : <NotFound />}
          />
          <Route
            path="OrdersInfo"
            element={loginData ? <OrdersInfo /> : <NotFound />}
          />
          <Route
            path="profile"
            element={loginData ? <Profile /> : <NotFound />}
          />
          <Route
            path="checkout"
            element={
              loginData ? (
                <CheckOut setTheAmountZero={setTheAmountZero} />
              ) : (
                <NotFound />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Router;
