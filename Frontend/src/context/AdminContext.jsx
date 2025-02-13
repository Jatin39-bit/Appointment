/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const AdminDataContext = createContext();

const AdminContext = ({children}) => {
  const [admin, setAdmin] = useState(null);
  return (
    <>
      <AdminDataContext.Provider value={{ admin, setAdmin }}>
        {children}
      </AdminDataContext.Provider>
    </>
  );
};

export default AdminContext;
