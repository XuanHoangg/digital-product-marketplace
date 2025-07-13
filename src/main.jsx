import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import HomePage from "./components/Content/HomePage/HomePage.jsx";
import Product from "./components/Content/Product/Product.jsx";
import Service from "./components/Content/Service/Service.jsx";
import Contact from "./components/Content/Contact/Contact.jsx";
import NotFound from "./components/Content/NotFound/NotFound.jsx";
import FAQPage from "./components/Content/FAQ/FAQPage.jsx";
import UserInfor from "./components/User/UserInFor/UserInfor.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import Layout from "./components/User/UserLayout/Layout.jsx";
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
              <Route path="/user" element={<Layout />}>
                <Route index element={<UserInfor />} />
                {/* Add other user-related routes here */}
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
