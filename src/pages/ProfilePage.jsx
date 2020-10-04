import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../components/SideBar/SideBar.css";
import {Link} from "react-router-dom";
import DeleteProfile from "../components/DeleteProfile/DeleteProfile";
import Loader from "../components/Loader/Loader";

// import { oneProject } from "../data";
function formatDate(string) {
  var options = {year: "numeric", month: "long", day: "numeric"};
  return new Date(string).toLocaleDateString([], options);
}

function ProfilePage() {
  let username = localStorage.username;
  let token = localStorage.token;
  const [ProfileData, setProfileData] = useState({});
  const [PublicProfileData, setPublicProfileData] = useState({});
  const [ProfileActivityData, setProfileActivity] = useState({});

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((results) => {
        console.log(results);
        return results.json();
      })
      .then((data) => {
        setProfileData(data);
        setPublicProfileData(data.userprofile);
        setisLoading(false);
      });
  }, [username]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/Activity/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProfileActivity(data);
      });
  }, [username]);

  return (
    <div>
      {!isLoading && (
        <div>
          <h1> Hello {ProfileData.preferred_name}!</h1>
          <h2>Account Details</h2>
          <h3>Username: {ProfileData.username}</h3>
          <h3>Email: {ProfileData.email}</h3>
          <h3>Preferred Name:{ProfileData.preferred_name}</h3>

          <h2>Profile Details</h2>

          {PublicProfileData.last_updated != null && (
            <h3>Last Updated: {formatDate(PublicProfileData.last_updated)}</h3>
          )}
          <h3>City: {PublicProfileData.city}</h3>
          {PublicProfileData.date_joined != null && (
            <h3>Date Joined: {formatDate(PublicProfileData.date_joined)}</h3>
          )}
          <h3>Display Picture {PublicProfileData.display_picture}</h3>
          <Link to={`/edit-userprofile/`}>
            <div>Update Profile & Account Details</div>
          </Link>

          <DeleteProfile />
        </div>
      )}

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
