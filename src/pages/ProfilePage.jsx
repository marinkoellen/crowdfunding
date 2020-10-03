import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/SideBar/SideBar.css";
import { Link } from "react-router-dom";

// import { oneProject } from "../data";
function formatDate(string) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

function ProfilePage() {
  let username = localStorage.username;

  const [ProfileData, setProfileData] = useState({});
  const [PublicProfileData, setPublicProfileData] = useState({});
  const [ProfileActivity, setProfileActivity] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProfileData(data);
        setPublicProfileData(data.userprofile);
      });
  }, [username]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/Activity`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProfileActivity(data);
      });
  }, [username]);

  console.log(ProfileActivity);
  console.log(PublicProfileData);
  console.log(ProfileData.userprofile);
  return (
    <div>
      <h1>Account Details</h1>
      <h2>Username: {ProfileData.username}</h2>
      <h2>Email: {ProfileData.email}</h2>
      <h2>Preferred Name:{ProfileData.preferred_name}</h2>

      <h1>Profile Details</h1>
      <h2>
        Last Updated Public Profile:{" "}
        {formatDate(PublicProfileData.last_updated)}
      </h2>
      <h2>City: {PublicProfileData.city}</h2>
      <h2>Date Joined: {formatDate(PublicProfileData.date_joined)}</h2>
      <h2>Display Picture {PublicProfileData.display_picture}</h2>

      {/* <Link to={`/users/edit/${username}`}>
        <div>Edit Profile</div>
      </Link> */}
    </div>
  );
}

export default ProfilePage;
