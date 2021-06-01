import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return <div>{user ? JSON.stringify(user) : "No one logged in"}</div>;
};

export default Dashboard;
