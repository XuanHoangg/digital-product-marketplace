import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "nprogress/nprogress.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
// auth
import Login from "./components/Auth/Login/Login.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword.jsx";
// user
import HomePage from "./components/Content/HomePage/HomePage.jsx";
import UserSecurity from "./components/User/UserSecurity/UserSecurity.jsx";
import UserWallet from "./components/User/UserWallet/UserWallet.jsx";
// import UserOrder from "./components/User/UserOrder/UserOrder.jsx";
// products and children
import Product from "./components/Content/Product/Product.jsx";
import DetailProduct from "./components/Content/Product/ProductDetail/ProductDetail.jsx";
//
import Service from "./components/Content/Service/Service.jsx";
import Contact from "./components/Content/Contact/Contact.jsx";
import NotFound from "./components/Content/NotFound/NotFound.jsx";
import FAQPage from "./components/Content/FAQ/FAQPage.jsx";
import UserInfor from "./components/User/UserInFor/UserInfor.jsx";

import Layout from "./components/User/UserLayout/Layout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
// seller
import SellerRoute from "./routes/SellerRoute.jsx";
import LayoutSeller from "./components/Seller/Layout/Layout.jsx";
import Overview from "./components/Seller/Content/Overview/Overview.jsx";
import ProductSeller from "./components/Seller/Content/Store/Store.jsx";
import Orders from "./components/Seller/Content/Orders/Orders.jsx";
// admin
import AdminLayout from "./components/Admin/Layout/Layout.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import AdminOverview from "./components/Admin/Content/Overview/Overview.jsx";
import AdminOrders from "./components/Admin/Content/Orders/Orders.jsx";
import AdminRevenue from "./components/Admin/Content/Revenue/Revenue.jsx";
import AdminUserManagement from "./components/Admin/Content/UserManagement/UserManagement.jsx";
import AdminProductManagement from "./components/Admin/Content/ProductManagement/ProductManagement.jsx";
import AdminSellerManagement from "./components/Admin/Content/SellerManagement/SellerManagement.jsx";
import AdminSetting from "./components/Admin/Content/Setting/Setting.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<DetailProduct />} />

              <Route path="/service" element={<Service />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/question" element={<FAQPage />} />
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<UserInfor />} />
                <Route path="security" element={<UserSecurity />} />
                <Route path="wallet" element={<UserWallet />} />
                {/* <Route path="orders" element={<UserOrder />} /> */}
                {/* Add other user-related routes here */}
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/seller"
              element={
                <SellerRoute>
                  <LayoutSeller />
                </SellerRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="products" element={<ProductSeller />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            {/* -------------------------------------------------------- */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route
                path="products-management"
                element={<AdminProductManagement />}
              />
              <Route path="orders-management" element={<AdminOrders />} />
              <Route path="revenue-management" element={<AdminRevenue />} />
              <Route path="user-management" element={<AdminUserManagement />} />
              <Route
                path="seller-management"
                element={<AdminSellerManagement />}
              />
              <Route path="setting" element={<AdminSetting />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </StrictMode>
    </PersistGate>
  </Provider>
);
