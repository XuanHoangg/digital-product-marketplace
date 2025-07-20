import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./UserSecurity.scss";
import { toast } from "react-toastify";
import { putChangePassword } from "../../../service/auth/authAPI"; // Assuming you have an API function to update the password
const UserSecurity = () => {
  const userId = useSelector((state) => state.auth.account.userId);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email } = useOutletContext();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await putChangePassword(
      userId,
      currentPassword,
      newPassword,
      confirmPassword
    );
    if (data?.status === 0) {
      toast.success(data.messageResult);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(data.messageResult);
    }
  };

  return (
    <div className="user-security">
      <div className="user-security__container">
        {/* Password Section */}
        <div className="user-security__section">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSecurity;
