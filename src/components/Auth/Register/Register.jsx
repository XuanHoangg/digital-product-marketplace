import React, { useState } from "react";
import "./Register.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("buyer");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
      confirmPassword,
      userType,
      agreeTerms,
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="register-logo">D</div>
          <h1 className="register-title">DigitalMarket</h1>
          <h2 className="register-subtitle">Đăng ký</h2>
          <p className="register-desc">
            Tham gia cùng chúng tôi để mua hoặc bán sản phẩm số
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label className="register-label">Email</label>
            <input
              type="email"
              className="register-input"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-field">
            <label className="register-label">Mật khẩu</label>
            <div className="register-password">
              <input
                type={showPassword ? "text" : "password"}
                className="register-input"
                placeholder="Tạo mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="register-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          <div className="register-field">
            <label className="register-label">Nhập lại mật khẩu</label>
            <div className="register-password">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="register-input"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="register-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          <div className="register-field">
            <label className="register-label">Bạn muốn trở thành:</label>
            <div className="register-user-type">
              <div
                className={`register-type-card ${
                  userType === "buyer" ? "active" : ""
                }`}
                onClick={() => setUserType("buyer")}
              >
                <div className="register-type-icon">🛒</div>
                <span className="user-type">Người mua</span>
              </div>
              <div
                className={`register-type-card ${
                  userType === "seller" ? "active" : ""
                }`}
                onClick={() => setUserType("seller")}
              >
                <div className="register-type-icon">👤</div>
                <span className="user-type">Người bán</span>
              </div>
            </div>
          </div>

          <div className="register-checkbox">
            <label className="register-check-item">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <span>
                Tôi đồng ý{" "}
                <a href="#" className="register-link">
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="#" className="register-link">
                  Chính sách bảo mật
                </a>
              </span>
            </label>
          </div>

          <button type="submit" className="register-btn register-btn-primary">
            Tạo tài khoản
          </button>

          <p className="register-login">
            Bạn đã có tài khoản?{" "}
            <NavLink
              to="/login"
              className="nav-link"
              style={{ color: "black" }}
            >
              Đăng nhập ngay
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
