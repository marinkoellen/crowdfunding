import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../UserPic/UserPic.css"

function ProfilePage(props) {

    const { username } = props
    const [ProfileData, setProfileData] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${username}/Activity/`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setProfileData(data.userprofile);
                console.log("activity", data)
            });
    }, [username]);

    return (
        <div id="imagecon">
            {ProfileData != null && (

                <div>
                    <div id="imagecon">
                        {
                            ProfileData.display_picture != null && (<img id="profilepicture" src={ProfileData.display_picture} alt="anon pic" />)
                        }
                    </div>

                    <div id="imagecon">
                        {
                            ProfileData.display_picture == null && (<img id="profilepicture" src="https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg" alt="anon pic" />)
                        }
                    </div>

                </div>
            )}

            {ProfileData == null && (
                <div id="imagecon">

                    <img id="profilepicture" src="https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg" alt="anon pic" />

                </div>
            )}

        </div>
    );
}

export default ProfilePage;
