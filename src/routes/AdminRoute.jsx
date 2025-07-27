import NotFound from "@components/Content/NotFound/NotFound";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const accessToken = useSelector((state) => state?.auth?.account?.accessToken);
  const role = useSelector((state) => state?.auth?.account?.role);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (!role || role !== "Admin") {
    return <NotFound />;
  }
  return children;
};

export default AdminRoute;
