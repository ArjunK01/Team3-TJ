import React, { useState } from "react";
import { setCacheNameDetails } from "workbox-core";
import axios from "axios";

export const AuthForm = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8000/login/",
      headers: {},
      data: {
        email,
        password
      }
    });
  };

  const signUp = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8000/signup/",
      headers: {},
      data: {
        email,
        password
      }
    });
  };

  return (
    <div className="authForm">
      {login ? "Log In Form" : "Sign Up Form"}
      <input
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div
        className="authSubmitBtn"
        onClick={() => (login ? logIn() : signUp())}
      >
        {login ? "Log In" : "Sign Up"}
      </div>
    </div>
  );
};
