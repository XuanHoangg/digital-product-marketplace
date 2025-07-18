import { Outlet, NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserProfile } from "../../../service/user/userAPI";
import { getShortName } from "../../../utils/helper";
import { FaRegUser } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { IoWalletSharp } from "react-icons/io5";
import { IoBagCheckSharp } from "react-icons/io5";
import { logout } from "../../../redux/slice/authSlice";

import "./Layout.scss";

const Layout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userId = useSelector((state) => state.auth.account.userId);
  const [abbreviatedName, setAbbreviatedName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [street, setStreet] = useState("");
  // const [city, setCity] = useState("");
  // const [district, setDistrict] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  // const [country, setCountry] = useState("");
  // const [isEmailVerified, setIsEmailVerified] = useState(false);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    let data = await getUserProfile(userId);
    // console.log("getUserData", data);

    if (data?.status === 0) {
      const initials = getShortName(data.data.fullName);
      setAbbreviatedName(initials);
      setFullname(data.data.fullName);
      setEmail(data.data.email);
      // setPhone(data.data.phoneNumber);
      // setStreet(data.data.street);
      // setCity(data.data.city);
      // setDistrict(data.data.district);
      // setPostalCode(data.data.postalCode);
      // setCountry(data.data.country);
      // setIsEmailVerified(data.data.isEmailVerified);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout({ data: { token: { refreshToken: "" } } }));
    navigate("/login");
  };
  return (
    <div className="layout">
      {/* Mobile Menu Button */}
      <button
        className="layout__mobile-menu-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span className={`hamburger ${isSidebarOpen ? "hamburger--open" : ""}`}>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </span>
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="layout__sidebar-overlay" onClick={closeSidebar} />
      )}

      <div
        className={`layout__sidebar ${
          isSidebarOpen ? "layout__sidebar--open" : ""
        }`}
      >
        <div className="sidebar">
          <div className="sidebar__user-profile">
            <div className="user-profile__avatar">
              <span className="avatar__initials">{abbreviatedName}</span>
            </div>
            <div className="user-profile__info">
              <h3 className="user-profile__name">{fullname}</h3>
              <p className="user-profile__email">{email}</p>
            </div>
            <button className="user-profile__edit-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12.146 1.854a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708L5.707 12.707a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168L12.146 1.854Z"
                  fill="currentColor"
                />
              </svg>
              Chỉnh Sửa Hồ Sơ
            </button>
          </div>

          <nav className="sidebar__nav">
            <ul className="nav__list">
              <li className="nav__item nav__item--active">
                {/* <a href="#" className="nav__link">
                  <FaRegUser />
                  Thông Tin Cá Nhân
                </a> */}
                <NavLink to="/user" className="nav__link">
                  <FaRegUser />
                  Thông Tin Cá Nhân
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/user/security" className="nav__link">
                  <MdSecurity />
                  Bảo Mật
                </NavLink>
                {/* <a href="#" className="nav__link">
                  <MdSecurity />
                  Bảo Mật
                </a> */}
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <IoWalletSharp />
                  Ví Của Tôi
                </a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <IoBagCheckSharp />
                  Đơn Hàng
                </a>
              </li>
              <li
                className="nav__item nav__item--logout"
                onClick={() => handleLogout()}
              >
                <a href="#" className="nav__link">
                  <svg
                    className="nav__icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2H4V5h4a1 1 0 0 0 0-2H3z"
                      fill="currentColor"
                    />
                    <path
                      d="M13 7a1 1 0 1 0-2 0v2H7a1 1 0 1 0 0 2h4v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7z"
                      fill="currentColor"
                    />
                  </svg>
                  Đăng Xuất
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="layout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
