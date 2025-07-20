import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerRoute = ({ children }) => {
  const accessToken = useSelector((state) => state?.auth?.account?.accessToken);
  const role = useSelector((state) => state?.auth?.account?.role);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (!role || role !== "Seller") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default SellerRoute;
