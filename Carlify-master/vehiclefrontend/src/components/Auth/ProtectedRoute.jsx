import { Navigate } from "react-router-dom"
import IsLoggedin from "./isLoggedIn"

function ProtectedRoute({children}) {
  if(IsLoggedin()){
    return children
  }
  else
    return <Navigate to="/"/>
}

export default ProtectedRoute
