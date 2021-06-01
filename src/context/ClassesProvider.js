import React, { createContext, useState } from "react";

const ClassesContext = createContext();

const ClassesProvider = ({ children }) => {
  const [classes, setClasses] = useState(null);
  return (
    <ClassesContext.Provider value={{ classes, setClasses }}>
      {children}
    </ClassesContext.Provider>
  );
};

export default ClassesProvider;

export { ClassesContext };
