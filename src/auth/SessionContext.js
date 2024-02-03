// SessionContext.js
import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Set user data in the session
    setUser(userData);
  };

  const logout = () => {
    // Clear user data from the session
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
