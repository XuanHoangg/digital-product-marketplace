import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import "./Login.scss";
import { postLogin } from "./../../../service/auth/authAPI";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = await postLogin(email, password);

    if (data.status === 0) {
      toast.success("Đăng nhâp thành công!");
      dispatch(loginSuccess(data));
      navigate("/");
    }
    if (data.status === 3) {
      toast.error(data.messageResult);
      return;
    }
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
            <NavLink to="/forgot-password" className="login-forgot">
              Quên mật khẩu?
            </NavLink>
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
