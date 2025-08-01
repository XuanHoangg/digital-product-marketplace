import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFound from "../components/Content/NotFound/NotFound";
const SellerRoute = ({ children }) => {
  const accessToken = useSelector((state) => state?.auth?.account?.accessToken);
  const role = useSelector((state) => state?.auth?.account?.role);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (!role || role !== "Seller") {
    return <NotFound />;
  }
  return children;
};

export default SellerRoute;
