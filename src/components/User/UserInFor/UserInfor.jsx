import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import OTPPopup from "../../Auth/OTPPopup/OTPPopup";

import { getUserProfile, putProfile } from "../../../service/user/userAPI";
import { getOTP, verifyOTP } from "../../../service/auth/authAPI";
import { LiaStarSolid } from "react-icons/lia";
import { BiErrorCircle } from "react-icons/bi";

import { toast } from "react-toastify";

import "./UserInfor.scss";

const UserInfor = () => {
  const userId = useSelector((state) => state.auth.account.userId);
  const fullnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isOTPPopupOpen, setIsOTPPopupOpen] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    let data = await getUserProfile(userId);
    if (data?.status === 0) {
      if (data.data.fullName === "Chưa có tên") {
        setFullname("");
      } else {
        setFullname(data.data.fullName);
      }
      if (data.data.phoneNumber === "Chưa có số điện thoại") {
        setPhone("");
      } else {
        setPhone(data.data.phoneNumber);
      }
      setEmail(data.data.email);

      setStreet(data.data.street);
      setCity(data.data.city);
      setDistrict(data.data.district);
      setPostalCode(data.data.postalCode);
      setCountry(data.data.country);
      setIsEmailVerified(data.data.isEmailVerified);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "fullName":
        setFullname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setStreet(value);
        break;
      case "city":
        setCity(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      case "country":
        setCountry(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname) {
      toast.error("Vui lòng nhập họ tên!");
      fullnameRef.current.focus();
      return;
    }

    if (!email) {
      toast.error("Vui lòng nhập email!");
      emailRef.current.focus();
      return;
    }

    if (!phone) {
      toast.error("Vui lòng nhập số điện thoại!");
      phoneRef.current.focus();
      return;
    }
    let data = await putProfile(
      userId,
      fullname,
      phone,
      email,
      street,
      city,
      district,
      postalCode,
      country
    );
    console.log("Update response:", data);

    if (data.status === 0) {
      toast.success(data.data);
      await getUserData();
    } else {
      toast.error("abc");
    }
  };
  // Hàm xử lý xác nhận OTP
  const handleVerifyOTP = async (email, otpCode) => {
    try {
      let data = await verifyOTP(email, otpCode);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (data.status === 0) {
        toast.success("Xác nhận OTP thành công!");
        setIsOTPPopupOpen(false);
        await getUserData();
        return;
      }
      if (data.status === 3) {
        toast.error(data.messageResult);
        return;
      }
    } catch (error) {
      toast.error("Mã OTP không đúng!");
    }
  };
  // Hàm xử lý gửi lại OTP
  const handleResendOTP = async () => {
    try {
      await getOTP(email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Đã gửi lại mã OTP!");
    } catch (error) {
      toast.error("Không thể gửi lại mã OTP!");
    }
  };
  const verifiedEmail = async () => {
    setIsOTPPopupOpen(true);
    await getOTP(email);
  };
  return (
    <div className="user-info">
      <div className="user-info__container">
        <div className="user-info__header">
          <h1 className="user-info__title">Thông tin cá nhân</h1>
          <p>
            Lưu ý các thông tin có <LiaStarSolid color="red" /> là những thông
            tin bắt buộc, bạn phải hoàn thành cập nhật để tiếp tục mua hàng.
          </p>
        </div>

        <form className="user-info__form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">
                Họ tên <LiaStarSolid color="red" />
              </label>
              <input
                ref={fullnameRef}
                type="text"
                name="fullName"
                value={fullname}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <LiaStarSolid color="red" />
              </label>
              <div className="form-input-wrapper">
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="vh@gmail.com"
                  disabled
                />
                <span className="form-input-status form-input-status--verified">
                  {isEmailVerified ? (
                    <span>Đã xác minh</span>
                  ) : (
                    <span
                      onClick={verifiedEmail}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      Chưa xác minh
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Số điện thoại <LiaStarSolid color="red" />
              </label>
              <input
                ref={phoneRef}
                type="number"
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
                <input
                  type="text"
                  name="district"
                  value={district}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Châu Thành"
                />
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
                <option value="Brazil">Brazil</option>
                <option value="Canada">Canada</option>
                <option value="China">China</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Mexico">Mexico</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Russia">Russia</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="South Korea">South Korea</option>
                <option value="Spain">Spain</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Turkey">Turkey</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
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
      <OTPPopup
        isOpen={isOTPPopupOpen}
        onClose={() => setIsOTPPopupOpen(false)}
        email={email}
        onVerify={handleVerifyOTP}
        onResend={handleResendOTP}
      />
    </div>
  );
};

export default UserInfor;
