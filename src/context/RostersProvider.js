import React, { createContext, useState } from "react";

const RostersContext = createContext();

const RostersProvider = ({ children }) => {
  const [rosters, setRosters] = useState([]);
  const [rerender, setRerender] = useState(false);
  
  return (
    <RostersContext.Provider
      value={{ rosters, setRosters, rerender, setRerender }}
    >
      {children}
    </RostersContext.Provider>
  );
};

export default RostersProvider;

export { RostersContext };
