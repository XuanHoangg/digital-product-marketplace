import React, { useState } from "react";
import "./Contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general",
      });
    }, 2000);
  };

  const contactMethods = [
    {
      id: 1,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
            fill="currentColor"
          />
        </svg>
      ),
      title: "Email",
      value: "support@digitalmarket.vn",
      description: "Gửi email cho chúng tôi bất kỳ lúc nào",
    },
    {
      id: 2,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
            fill="currentColor"
          />
        </svg>
      ),
      title: "Điện thoại",
      value: "033 0605 760",
      description: "Gọi trực tiếp trong giờ hành chính",
    },
    {
      id: 3,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="currentColor"
          />
        </svg>
      ),
      title: "Địa chỉ",
      value:
        "KĐT Trung tâm Hành chính Tỉnh, 2 Đường số 22, KP Bình Cư 2, Tân An, Long An",
      description: "Văn phòng làm việc chính",
    },
    {
      id: 4,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="currentColor"
          />
        </svg>
      ),
      title: "Hỗ trợ 24/7",
      value: "Chat trực tuyến",
      description: "Hỗ trợ khách hàng mọi lúc mọi nơi",
    },
  ];

  const workingHours = [
    { day: "Thứ 2 - Thứ 6", time: "8:00 - 17:30" },
    { day: "Thứ 7", time: "8:00 - 12:00" },
    { day: "Chủ nhật", time: "Nghỉ" },
  ];

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="contact-hero__content">
          <h1 className="contact-hero__title">Liên Hệ Với Chúng Tôi</h1>
          <p className="contact-hero__subtitle">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ để được tư vấn và
            giải đáp mọi thắc mắc
          </p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-wrapper">
          {/* Contact Methods */}
          <div className="contact-methods">
            <h2 className="contact-methods__title">Thông Tin Liên Hệ</h2>
            <div className="contact-methods__grid">
              {contactMethods.map((method) => (
                <div key={method.id} className="contact-method">
                  <div className="contact-method__icon">{method.icon}</div>
                  <div className="contact-method__content">
                    <h3 className="contact-method__title">{method.title}</h3>
                    <p className="contact-method__value">{method.value}</p>
                    <p className="contact-method__description">
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form and Info */}
          <div className="contact-main">
            <div className="contact-form-section">
              <h2 className="contact-form-section__title">Gửi Tin Nhắn</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label className="contact-form__label">Họ và tên *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact-form__input"
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact-form__input"
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label className="contact-form__label">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="contact-form__input"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">Chủ đề *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="contact-form__select"
                      required
                    >
                      <option value="general">Tư vấn chung</option>
                      <option value="support">Hỗ trợ kỹ thuật</option>
                      <option value="billing">Thanh toán</option>
                      <option value="partnership">Hợp tác</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label">Tiêu đề *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="contact-form__input"
                    placeholder="Nhập tiêu đề tin nhắn"
                    required
                  />
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label">Nội dung *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="contact-form__textarea"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <div className="contact-form__actions">
                  <button
                    type="submit"
                    className="contact-form__submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <div className="contact-form__success">
                    <p>
                      Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm
                      nhất có thể.
                    </p>
                  </div>
                )}
              </form>
            </div>

            <div className="contact-info-section">
              <div className="working-hours">
                <h3 className="working-hours__title">Giờ Làm Việc</h3>
                <div className="working-hours__list">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="working-hours__item">
                      <span className="working-hours__day">{schedule.day}</span>
                      <span className="working-hours__time">
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-support">
                <h3 className="quick-support__title">Hỗ Trợ Nhanh</h3>
                <div className="quick-support__content">
                  <p className="quick-support__text">
                    Cần hỗ trợ gấp? Hãy sử dụng chat trực tuyến hoặc gọi hotline
                    để được hỗ trợ ngay lập tức.
                  </p>
                  <div className="quick-support__actions">
                    <button className="quick-support__btn quick-support__btn--primary">
                      Chat ngay
                    </button>
                    <button className="quick-support__btn quick-support__btn--secondary">
                      Gọi hotline
                    </button>
                  </div>
                </div>
              </div>

              <div className="contact-note">
                <h3 className="contact-note__title">Lưu Ý</h3>
                <ul className="contact-note__list">
                  <li>Chúng tôi sẽ phản hồi trong vòng 24 giờ</li>
                  <li>Các yêu cầu kỹ thuật cần thời gian xử lý 1-3 ngày</li>
                  <li>
                    Vui lòng cung cấp thông tin chi tiết để được hỗ trợ tốt nhất
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
