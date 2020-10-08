import React, { useEffect, useState } from "react";
import ProfileEditForm from "../components/ProfileEditForm/ProfileEditForm";
import Loader from "../components/Loader/Loader";

function EditProfilePage() {
  let username = localStorage.username;
  let token = localStorage.token;
  const [ProfileData, setProfileData] = useState({});
  const [PublicProfileData, setPublicProfileData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setPublicProfileData(data.userprofile);
        setProfileData(data);
        setLoading(false);
      });
  }, [username]);

  return (
    <div>
      {!isLoading && (
        <div>
          <ProfileEditForm
            ProfileData={ProfileData}
            PublicProfileData={PublicProfileData}
          />
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

export default EditProfilePage;
