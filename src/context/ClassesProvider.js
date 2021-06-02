import React, { createContext, useState } from "react";

const ClassesContext = createContext();

const ClassesProvider = ({ children }) => {
  const [classes, setClasses] = useState(null);
  const [rerender, setRerender] = useState(false);
  
  return (
    <ClassesContext.Provider
      value={{ classes, setClasses, rerender, setRerender }}
    >
      {children}
    </ClassesContext.Provider>
  );
};

export default ClassesProvider;

export { ClassesContext };
