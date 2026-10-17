import { Navigate } from "react-router-dom";
import isAdminLoggedIn from "./isAdminLoggedIn";

function ProtectedAdmin({ children }) {
  if (isAdminLoggedIn()) {
    return children;
  } else return <Navigate to="/" />;
}

export default ProtectedAdmin;
