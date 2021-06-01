import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log("HERE", firebaseUser.uid);
        setTimeout(
          () =>
            axios
              .get(`http://localhost:8000/login?id=${firebaseUser.uid}`)
              .then(res => {
                setUser(res && res.data);
              }),
          100
        );
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export { AuthContext };
