import firebase from "../firebase";
import React, { useState } from "react";
import { setCacheNameDetails } from "workbox-core";
import axios from "axios";

export const AuthForm = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [setIsTeacher, isTeacher] = useState(true);

  const logIn = async () => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signUp = async () => {
    if (!email || !password || !name) return;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        axios({
          method: "post",
          url: "http://localhost:8000/staff/add",
          headers: {},
          data: {
            email: newUser.user.email,
            isAdmin: true,
            isTeacher: false,
            fName: name.split(" ")[0],
            lName: name.split(" ")[1],
            docId: newUser.user.uid // This is the body part
          }
        });
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
      {!login && (
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}
      <div
        className="authSubmitBtn"
        onClick={() => (login ? logIn() : signUp())}
      >
        {login ? "Log In" : "Sign Up"}
      </div>
    </div>
  );
};
