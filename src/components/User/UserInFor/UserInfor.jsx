import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserProfile } from "../../../service/user/userAPI";

import "./UserInfor.scss";

const UserInfor = () => {
  const userId = useSelector((state) => state.auth.account.userId);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    let data = await getUserProfile(userId);
    // console.log("getUserData", data);

    if (data?.status === 0) {
      setFullname(data.data.fullName);
      setEmail(data.data.email);
      setPhone(data.data.phoneNumber);
      setStreet(data.data.street);
      setCity(data.data.city);
      setDistrict(data.data.district);
      setPostalCode(data.data.postalCode);
      setCountry(data.data.country);
      setIsEmailVerified(data.data.isEmailVerified);
    }
  };
  //   const [formData, setFormData] = useState({
  //     fullName: "Vũ Đình Xuân Hoàng",
  //     email: "vh@gmail.com",
  //     phone: "0123456789",
  //     address: "123 Main Street",
  //     city: "Long An",
  //     district: "Châu Thành",
  //     postalCode: "000000",
  //     country: "Việt Nam",
  //   });

  const handleInputChange = (e) => {
    setFullname(e.target.value);
    setEmail(e.target.value);
    setPhone(e.target.value);
    setStreet(e.target.value);
    setCity(e.target.value);
    setDistrict(e.target.value);
    setPostalCode(e.target.value);
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", {
      fullname,
      email,
      phone,
      street,
      city,
      district,
      postalCode,
      country,
    });
  };

  return (
    <div className="user-info">
      <div className="user-info__container">
        <div className="user-info__header">
          <h1 className="user-info__title">Thông tin cá nhân</h1>
        </div>

        <form className="user-info__form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Họ tên</label>
              <input
                type="text"
                name="fullName"
                value={fullname}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="form-input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="vh@gmail.com"
                />
                <span className="form-input-status form-input-status--verified">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                      fill="currentColor"
                    />
                  </svg>
                  {isEmailVerified ? "Đã xác minh" : "Chưa xác minh"}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="0123456789"
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section__title">Địa chỉ</h3>

            <div className="form-group">
              <label className="form-label">Tên đường</label>
              <input
                type="text"
                name="address"
                value={street}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Vd: 123 Main Street"
              />
            </div>

            <div className="form-row">
              <div className="form-group form-group--half">
                <label className="form-label">Thành phố</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Long An"
                />
              </div>

              <div className="form-group form-group--half">
                <label className="form-label">Quận/Huyện</label>
                <select
                  name="district"
                  value={district}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Châu Thành">Châu Thành</option>
                  <option value="Tân An">Tân An</option>
                  <option value="Cần Đước">Cần Đước</option>
                  <option value="Cần Giuộc">Cần Giuộc</option>
                </select>
              </div>

              <div className="form-group form-group--half">
                <label className="form-label">Mã bưu cục</label>
                <input
                  type="text"
                  name="postalCode"
                  value={postalCode}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="000000"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Quốc gia</label>
              <select
                name="country"
                value={country}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="Việt Nam">Việt Nam</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn--primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfor;
