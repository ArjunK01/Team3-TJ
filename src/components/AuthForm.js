import firebase from "../firebase";
import React, { useState } from "react";
import { setCacheNameDetails } from "workbox-core";
import axios from "axios";
import "../styles/auth.css";

export const AuthForm = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setIsAdmin(false);
    setIsTeacher(false);
    setFirst("");
    setLast("");
  };
  const logIn = async () => {
    setError(null);
    firebase
      .auth()
      .signInWithEmailAndPassword(email + "@tjschool.org", password)
      .then(res => resetForm())
      .catch(err => setError(err));
  };

  const signUp = async () => {
    setError(null);
    if (!email || !password || !first || !last) return;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email + "@tjschool.org", password)
      .then(newUser => {
        axios({
          method: "post",
          url: "http://localhost:8000/staff/add",
          headers: {},
          data: {
            email: newUser.user.email,
            isAdmin,
            isTeacher,
            fName: first,
            lName: last,
            docId: newUser.user.uid // This is the body part
          }
        });
      })
      .catch(err => setError(err));
  };

  return (
    <div className="authForm">
      <p className="logInHeader">
        {login ? "Welcome Back!" : "Create an Account"}
      </p>

      <div class="input-group mb-2">
        <input
          type="text"
          class="form-control authInput"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon2"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">
            @tjschool.org
          </span>
        </div>
      </div>
      {!login && (
        <div className="nameInput mb-2">
          <input
            placeholder="First"
            value={first}
            onChange={e => setFirst(e.target.value)}
            class="form-control authInput"
          />
          <input
            placeholder="Last"
            value={last}
            onChange={e => setLast(e.target.value)}
            class="form-control authInput"
          />
        </div>
      )}

      <input
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="text"
        class="form-control authInput mb-3"
      />
      {!login && (
        <div className="statusInput mb-3">
          <div
            className="teacherStatus"
            onClick={() => setIsTeacher(teacher => !teacher)}
            style={{
              backgroundColor: isTeacher ? "#EAECEF" : null,
              color: isTeacher ? "#495057" : "#6D757D",
              border: isTeacher ? null : "1px solid #ced4da"
            }}
          >
            Teacher
          </div>
          <div
            className="adminStatus"
            onClick={() => setIsAdmin(admin => !admin)}
            style={{
              backgroundColor: isAdmin ? "#EAECEF" : null,
              color: isAdmin ? "#495057" : "#6D757D",
              border: isAdmin ? null : "1px solid #ced4da"
            }}
          >
            Admin
          </div>
        </div>
      )}
      <div className="submitContainer">
        <div
          className="authSubmitBtn"
          onClick={() => (login ? logIn() : signUp())}
        >
          {login ? "Log In" : "Sign Up"}
        </div>
      </div>
      {error ? (
        <p className="errorMessage text-danger ">{error.message}</p>
      ) : null}
    </div>
  );
};
