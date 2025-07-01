import React from "react";
import { useState } from "react";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">D</div>
          <h1 className="login-title">DigitalMarket</h1>
          <h2 className="login-subtitle">Đăng nhập</h2>
          <p className="login-desc">
            Chào mừng! Điền thông tin đăng nhập của bạn
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-password">
              <input
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Ghi nhớ</span>
            </label>
            <a href="#" className="login-forgot">
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" className="login-btn login-btn-primary">
            Đăng nhập
          </button>

          <button type="button" className="login-btn login-btn-facebook">
            FACEBOOK
          </button>

          <button type="button" className="login-btn login-btn-google">
            GOOGLE
          </button>

          <p className="login-signup">
            {" "}
            Bạn chưa có tài khoản?{" "}
            <NavLink
              to="/register"
              className="nav-link"
              style={{ color: "black" }}
            >
              Đăng ký
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
