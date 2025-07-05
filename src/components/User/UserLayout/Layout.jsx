import React, { useState } from "react";
import { User, Shield, CreditCard, ShoppingBag, LogOut } from "lucide-react";
import "./Layout.scss";
const Layout = () => {
  const [formData, setFormData] = useState({
    fullName: "Võ Đình Xuân Hoàng",
    email: "xh@gmail.com",
    phone: "0123456789",
    street: "123 Main Street",
    city: "Long An",
    district: "Châu Thành",
    zipCode: "000000",
    country: "Việt Nam",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };
  return (
    <div className="profile-container">
      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="avatar-initials">NT</span>
            </div>
            <div className="profile-info">
              <h3 className="profile-name">Nguyễn Văn Tùng</h3>
              <p className="profile-email">tung.nguyenvan@example.com</p>
            </div>
            <button className="edit-profile-btn">
              <User size={16} />
              Chỉnh Sửa Hồ Sơ
            </button>
          </div>

          <nav className="profile-nav">
            <a href="#" className="nav-item active">
              <User size={18} />
              <span>Thông Tin Cá Nhân</span>
            </a>
            <a href="#" className="nav-item">
              <Shield size={18} />
              <span>Bảo Mật</span>
            </a>
            <a href="#" className="nav-item">
              <CreditCard size={18} />
              <span>Ví Của Tôi</span>
            </a>
            <a href="#" className="nav-item">
              <ShoppingBag size={18} />
              <span>Đơn Hàng</span>
            </a>
            <a href="#" className="nav-item logout">
              <LogOut size={18} />
              <span>Đăng Xuất</span>
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="content-header">
            <h2 className="page-title">Thông tin cá nhân</h2>
          </div>

          <div className="profile-form">
            {/* Personal Information */}
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Họ tên
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Võ Đình Xuân Hoàng"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="xh@gmail.com"
                />
                <div className="email-status">
                  <span className="email-verified">✓ Email verified</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="form-section">
              <h3 className="section-title">Địa chỉ</h3>

              <div className="form-group">
                <label htmlFor="street" className="form-label">
                  Tên đường
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="form-input"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    Thành phố
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-input"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Long An"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="district" className="form-label">
                    Quận/Huyện
                  </label>
                  <select
                    id="district"
                    name="district"
                    className="form-select"
                    value={formData.district}
                    onChange={handleInputChange}
                  >
                    <option value="Châu Thành">Châu Thành</option>
                    <option value="Tân An">Tân An</option>
                    <option value="Cần Đước">Cần Đước</option>
                    <option value="Cần Giuộc">Cần Giuộc</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode" className="form-label">
                    Mã bưu cục
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="form-input"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="000000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country" className="form-label">
                  Quốc gia
                </label>
                <select
                  id="country"
                  name="country"
                  className="form-select"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="Việt Nam">Việt Nam</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="save-btn" onClick={handleSubmit}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
