/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { createContext, useState} from "react";


export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const loggedIn=useMemo(()=>user!==null,[user]);
  return (
    <UserDataContext.Provider value={{ user, setUser, loggedIn }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
  