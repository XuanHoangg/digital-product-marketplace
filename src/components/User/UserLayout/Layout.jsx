import { Outlet, NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserProfile, getProfileMini } from "../../../service/user/userAPI";
import { getShortName } from "../../../utils/helper";
import { FaRegUser } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { IoWalletSharp } from "react-icons/io5";
import { IoBagCheckSharp } from "react-icons/io5";
import { VscDebugContinue } from "react-icons/vsc";

import { logout } from "../../../redux/slice/authSlice";
import Popup from "./../Popup/ProfilePopup/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.scss";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleSlice = useSelector((state) => state.auth.account.role);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userId = useSelector((state) => state.auth.account.userId);
  const [abbreviatedName, setAbbreviatedName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getUserData = async () => {
    try {
      // Gọi full thông tin
      let data = await getUserProfile(userId);
      let mini = await getProfileMini(userId);

      if (data?.status === 0) {
        const initials = getShortName(data.data.fullName);
        setAbbreviatedName(initials);
        setFullname(data.data.fullName);
        setEmail(data.data.email);
      }

      if (mini?.status === 0) {
        setProfileImage(mini.data.profileImage);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  return (
    <div className="layout">
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
      <div
        className={`layout__sidebar-overlay ${
          isSidebarOpen ? "layout__sidebar-overlay--visible" : ""
        }`}
        onClick={closeSidebar}
      />

      <div
        className={`layout__sidebar ${
          isSidebarOpen ? "layout__sidebar--open" : ""
        }`}
      >
        <div className="sidebar">
          <div className="sidebar__user-profile">
            <div className="user-profile__avatar">
              {profileImage ? (
                <img
                  src={`data:image/jpeg;base64,${profileImage}`}
                  alt="avatar"
                  className="avatar-image"
                />
              ) : (
                <span className="avatar__initials">{abbreviatedName}</span>
              )}
            </div>
            <div className="user-profile__info">
              <h3 className="user-profile__name">{fullname}</h3>
              <p className="user-profile__email">{email}</p>
            </div>
            <button
              className="user-profile__edit-btn"
              onClick={() => setModalShow(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12.146 1.854a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708L5.707 12.707a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168L12.146 1.854Z"
                  fill="currentColor"
                />
              </svg>
              Chỉnh Sửa Hồ Sơ
            </button>
            {roleSlice === "Seller" ? (
              <NavLink to="/seller" className="direct-to-store">
                <VscDebugContinue />
                Chuyển sang trang cửa hàng
              </NavLink>
            ) : null}
            {roleSlice === "Admin" ? (
              <NavLink to="/admin" className="direct-to-store">
                <VscDebugContinue />
                Chuyển sang trang quản trị
              </NavLink>
            ) : null}
          </div>

          <nav className="sidebar__nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    `nav__link ${isActive ? "nav__item--active" : ""}`
                  }
                  onClick={handleNavLinkClick}
                >
                  <FaRegUser className="nav__icon" />
                  Thông Tin Cá Nhân
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/user/security"
                  className={({ isActive }) =>
                    `nav__link ${isActive ? "nav__item--active" : ""}`
                  }
                  onClick={handleNavLinkClick}
                >
                  <MdSecurity className="nav__icon" />
                  Bảo Mật
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/user/wallet"
                  className={({ isActive }) =>
                    `nav__link ${isActive ? "nav__item--active" : ""}`
                  }
                  onClick={handleNavLinkClick}
                >
                  <IoWalletSharp className="nav__icon" />
                  Ví Của Tôi
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/user/orders"
                  className={({ isActive }) =>
                    `nav__link ${isActive ? "nav__item--active" : ""}`
                  }
                  onClick={handleNavLinkClick}
                >
                  <IoBagCheckSharp className="nav__icon" />
                  Đơn Hàng
                </NavLink>
              </li>
              <li className="nav__item nav__item--logout">
                <button
                  className="nav__link"
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
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
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="layout__content">
        <Outlet context={{ email, refreshUserData: getUserData }} />
      </div>
      <Popup
        show={modalShow}
        onHide={() => setModalShow(false)}
        fullname={fullname}
        email={email}
        onUpdated={getUserData}
      />
    </div>
  );
};

export default Layout;
