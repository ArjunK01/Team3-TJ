import React, { createContext, useState } from "react";

const RosterContext = createContext();

const RosterProvider = ({ children }) => {
  const [roster, setRoster] = useState(null);

  return (
    <RosterContext.Provider 
      value={{ roster, setRoster }}
    >
      {children}
    </RosterContext.Provider>
  );
};

export default RosterProvider;

export { RosterContext };