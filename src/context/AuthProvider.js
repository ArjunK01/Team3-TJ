import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setLoading(true);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().onAuthStateChanged(firebaseUser => {
      setLoading(true);
      if (firebaseUser) {
        console.log("HERE", firebaseUser.uid);
        setTimeout(
          () =>
            axios
              .get(`http://localhost:8000/login?id=${firebaseUser.uid}`)
              .then(res => {
                setUser(res && res.data);
                setLoading(false);
              }),
          100
        );
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Loading />;
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export { AuthContext };
