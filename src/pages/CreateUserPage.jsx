import React from "react";
import UserForm from "../components/UserForm/UserForm";
import LogoutForm from "../components/LogoutForm/LogoutForm";
import Loader from "../components/Loader/Loader";

function CreateUserPage() {
  let username = localStorage.username;
  let token = localStorage.token;

  return (
    <div>
      {token == null && (
        <div>
          <UserForm />
        </div>
      )}
      {token != null && (
        <div>
          <h2>
            You are already logged in as user {username}! Please log out to
            register a new user{" "}
          </h2>
          <LogoutForm />
        </div>
      )}
    </div>
  );
}

export default CreateUserPage;
