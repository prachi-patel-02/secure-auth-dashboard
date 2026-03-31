import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");

  // token(nahi)->login pe
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //token(hai)→ dashboard 
  return children;
}

export default ProtectedRoute;
