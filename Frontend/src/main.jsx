import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext  from "./context/UserContext.jsx";
import AdminContext from "./context/AdminContext.jsx";
import DoctorContext from "./context/DoctorContext.jsx";

createRoot(document.getElementById("root")).render(
  <AdminContext>
    <DoctorContext>
      <UserContext>
        <App />
      </UserContext>
    </DoctorContext>
  </AdminContext>
);
