import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // navigate to login if the user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // render the protected content if the user is logged in
  return children;
}
