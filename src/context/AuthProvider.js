import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
                console.log("GOT USER DATA", res);
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
