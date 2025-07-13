import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaReddit } from "react-icons/fa";
import { getUserProfile } from "../service/user/userAPI";
import { getShortName } from "../utils/helper";
import { logout } from "../redux/slice/authSlice";
import "./layouts.scss";

const Layouts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.account.userId);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fullname, setFullname] = useState("");
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    let data = await getUserProfile(userId);
    // console.log("getUserData", data);

    if (data?.status === 0) {
      const initials = getShortName(data.data.fullName);
      setFullname(initials);
    }
  };
  const handleProfile = () => {
    navigate("/user");
  };
  const handleLogout = () => {
    dispatch(logout({ data: { token: { refreshToken: "" } } }));
    navigate("/login");
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="digital-market-layout">
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <div className="header__logo-icon">D</div>
            <span className="header__logo-text">DigitalMarket</span>
          </div>

          <nav
            className={`header__nav ${
              isMobileMenuOpen ? "header__nav--open" : ""
            }`}
          >
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <NavLink to="/" className="header__nav-link">
                  Trang chủ
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink to="/product" className="header__nav-link">
                  Sản phẩm
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink to="/service" className="header__nav-link">
                  Dịch vụ
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink to="/contact" className="header__nav-link">
                  Liên hệ
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink to="/question" className="header__nav-link">
                  Câu hỏi
                </NavLink>
              </li>
            </ul>
          </nav>

          <div
            className={`header__actions ${
              isMobileMenuOpen ? "header__actions--open" : ""
            }`}
          >
            <Nav>
              {!isAuthenticated ? (
                <>
                  <NavLink
                    to="/login"
                    className="header__btn header__btn--login"
                  >
                    Đăng nhập
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="header__btn header__btn--register"
                  >
                    Đăng ký
                  </NavLink>
                </>
              ) : (
                <div className="header__avatar-container">
                  <div
                    className="header__avatar"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {fullname}
                  </div>
                  {showDropdown && (
                    <div className="header__dropdown">
                      <div
                        className="header__dropdown-item"
                        onClick={handleProfile}
                      >
                        Hồ sơ cá nhân
                      </div>
                      <div
                        className="header__dropdown-item"
                        onClick={() => handleLogout()}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Nav>
            {/* --- */}
            {/* <NavLink to="/login" className="header__btn header__btn--login">
              Đăng nhập
            </NavLink>

            <NavLink
              to="/register"
              className="header__btn header__btn--register"
            >
              Đăng ký
            </NavLink> */}
          </div>

          <button className="header__mobile-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-icon">D</div>
                <span className="footer__logo-text">DigitalMarket</span>
              </div>
              <p className="footer__description">
                Sàn giao dịch tin cậy của bạn để mua và bán các sản phẩm số cao
                cấp từ các nhà sáng tạo trên toàn thế giới.
              </p>
            </div>

            <div className="footer__links">
              <h3 className="footer__links-title">Liên kết</h3>
              <ul className="footer__links-list">
                <li className="footer__links-item">
                  <NavLink to="/" className="footer__links-link">
                    Trang chủ
                  </NavLink>
                </li>
                <li className="footer__links-item">
                  <NavLink to="/product" className="footer__links-link">
                    Sản phẩm
                  </NavLink>
                </li>
                <li className="footer__links-item">
                  <NavLink to="/service" className="footer__links-link">
                    Dịch vụ
                  </NavLink>
                </li>
                <li className="footer__links-item">
                  <NavLink to="/contact" className="footer__links-link">
                    Liên hệ
                  </NavLink>
                </li>
                <li className="footer__links-item">
                  <NavLink to="/question" className="footer__links-link">
                    Câu hỏi
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="footer__social">
              <h3 className="footer__social-title">Kết nối với chúng tôi</h3>
              <div className="footer__social-icons">
                <a href="#" className="footer__social-icon">
                  <FaFacebook />
                </a>
                <a href="#" className="footer__social-icon">
                  <FaYoutube />
                </a>
                <a href="#" className="footer__social-icon">
                  <AiFillInstagram />
                </a>
                <a href="#" className="footer__social-icon">
                  <FaReddit />
                </a>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">
              © 2025 DigitalMarket. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layouts;
