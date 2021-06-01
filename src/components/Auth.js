import React, { useState } from "react";
import { AuthForm } from "./AuthForm";
import "../styles/auth.css";

const Auth = () => {
  const [login, setLogin] = useState(true);



  return (
    <div className="authContainer">
      <div className="authFormContainer">
        <AuthForm login={login} />
        <div className="loginSwitchBtn" onClick={() => setLogin(log => !log)}>
          {login ? "Sign Up" : "Log In"}
        </div>
      </div>
    </div>
  );
};

export default Auth;
