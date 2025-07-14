import React, { useState } from "react";
import "./UserSecurity.scss";

const UserSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("example@example.com");
  const [phone, setPhone] = useState("+84 *** *** 789");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="user-security">
      <div className="user-security__container">
        {/* Password Section */}
        <div className="user-security__section">
          <h2 className="user-security__title">Bảo Mật Tài Khoản</h2>
          <p className="user-security__subtitle">
            Quản lý các thiết lập bảo mật để bảo vệ tài khoản của bạn
          </p>

          <div className="user-security__form-section">
            <h3 className="user-security__section-title">Mật Khẩu</h3>

            <form onSubmit={handleSubmit}>
              <div className="user-security__form-group">
                <label className="user-security__label">
                  Mật Khẩu Hiện Tại
                </label>
                <div className="user-security__input-wrapper">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="user-security__input"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="user-security__toggle-btn"
                    onClick={() => handlePasswordVisibility("current")}
                  >
                    Hiện
                  </button>
                </div>
              </div>

              <div className="user-security__form-group">
                <label className="user-security__label">Mật Khẩu Mới</label>
                <div className="user-security__input-wrapper">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="user-security__input"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="user-security__toggle-btn"
                    onClick={() => handlePasswordVisibility("new")}
                  >
                    Hiện
                  </button>
                </div>
                <small className="user-security__help-text">
                  Mật khẩu phải có ít nhất 8 ký tự
                </small>
              </div>

              <div className="user-security__form-group">
                <label className="user-security__label">
                  Xác Nhận Mật Khẩu
                </label>
                <div className="user-security__input-wrapper">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="user-security__input"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="user-security__toggle-btn"
                    onClick={() => handlePasswordVisibility("confirm")}
                  >
                    Hiện
                  </button>
                </div>
              </div>

              <div className="user-security__form-actions">
                <button
                  type="button"
                  className="user-security__btn user-security__btn--secondary"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="user-security__btn user-security__btn--primary"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 2FA Section */}
        <div className="user-security__section">
          <h3 className="user-security__section-title">
            Xác Thực Hai Yếu Tố (2FA)
          </h3>
          <p className="user-security__section-subtitle">
            Bảo vệ tài khoản của bạn bằng lớp bảo mật bổ sung
          </p>

          <div className="user-security__2fa-container">
            <div className="user-security__2fa-status">
              <div className="user-security__2fa-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="user-security__2fa-content">
                <h4 className="user-security__2fa-title">
                  Xác thực hai yếu tố đang được bật
                </h4>
                <p className="user-security__2fa-description">
                  Khi đăng nhập, bạn sẽ cần nhập mã xác thực được gửi đến email
                  hoặc số điện thoại của bạn. Điều này giúp bảo vệ tài khoản của
                  bạn ngay cả khi bị lộ mật khẩu.
                </p>
              </div>
            </div>

            <div className="user-security__contact-methods">
              <div className="user-security__contact-item">
                <div className="user-security__contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="22,6 12,13 2,6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="user-security__contact-content">
                  <span className="user-security__contact-label">Email</span>
                  <span className="user-security__contact-value">{email}</span>
                </div>
                <button className="user-security__contact-btn">Chính</button>
              </div>

              <div className="user-security__contact-item">
                <div className="user-security__contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="user-security__contact-content">
                  <span className="user-security__contact-label">
                    Điện thoại
                  </span>
                  <span className="user-security__contact-value">{phone}</span>
                </div>
                <button className="user-security__contact-btn">
                  Thiết lập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSecurity;
