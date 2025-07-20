import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
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
import Product from "./components/Content/Product/Product.jsx";
import Service from "./components/Content/Service/Service.jsx";
import Contact from "./components/Content/Contact/Contact.jsx";
import NotFound from "./components/Content/NotFound/NotFound.jsx";
import FAQPage from "./components/Content/FAQ/FAQPage.jsx";
import UserInfor from "./components/User/UserInFor/UserInfor.jsx";

import Layout from "./components/User/UserLayout/Layout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import UserSecurity from "./components/User/UserSecurity/UserSecurity.jsx";
// seller
import SellerRoute from "./routes/SellerRoute.jsx";
import LayoutSeller from "./components/Seller/Layout/Layout.jsx";
import Overview from "./components/Seller/Content/Overview/Overview.jsx";
import ProductSeller from "./components/Seller/Content/Store/Store.jsx";
import Orders from "./components/Seller/Content/Orders/Orders.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="/product" element={<Product />} />
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
