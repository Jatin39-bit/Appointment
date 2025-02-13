import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext  from "./context/UserContext.jsx";
import AdminContext from "./context/AdminContext.jsx";
import DoctorContext from "./context/DoctorContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AdminContext>
    <DoctorContext>
      <UserContext>
        <App />
      </UserContext>
    </DoctorContext>
  </AdminContext>
  </BrowserRouter>
);
