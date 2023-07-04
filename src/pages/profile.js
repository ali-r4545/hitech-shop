import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import "./profile.css";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://kzico.runflare.run/user/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <div style={{ height: "100vh", backgroundColor: "var(--clr-teal)" }}>
      <div className="profile-container">
        <Image className="profile-image" src={data && data.user.image} />
        <div className="profile-info">
          <p>Email : {data && data.user.email} </p>
          <p>Username : {data && data.user.username}</p>
          <p>Mobile : {data && data.user.mobile}</p>
          <p>Firstname : {data && data.user.firstname}</p>
          <p>Lastname : {data && data.user.lastname}</p>
          <p>Gender : {data && data.user.gender}</p>
          <p>Age : {data && data.user.age}</p>
          <p>City : {data && data.user.city}</p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
