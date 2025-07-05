import React, { useState } from "react";
import "./Service.scss";

const Service = () => {
  const [activeTab, setActiveTab] = useState("digital-services");

  const digitalServices = [
    {
      id: 1,
      title: "Thiết Kế Website",
      description: "Tạo website chuyên nghiệp, responsive và tối ưu SEO",
      price: "Từ 5.000.000 VNĐ",
      features: ["Responsive Design", "SEO Tối Ưu", "Tốc Độ Cao", "Bảo Mật"],
      icon: "🌐",
    },
    {
      id: 2,
      title: "Phát Triển Ứng Dụng Mobile",
      description: "Xây dựng app iOS/Android theo yêu cầu",
      price: "Từ 15.000.000 VNĐ",
      features: [
        "Native App",
        "Cross Platform",
        "UI/UX Design",
        "App Store Deploy",
      ],
      icon: "📱",
    },
    {
      id: 3,
      title: "Marketing Digital",
      description: "Quảng cáo Facebook, Google Ads, SEO",
      price: "Từ 3.000.000 VNĐ/tháng",
      features: ["Facebook Ads", "Google Ads", "SEO", "Content Marketing"],
      icon: "📊",
    },
    {
      id: 4,
      title: "Thiết Kế Đồ Họa",
      description: "Logo, banner, brochure, poster chuyên nghiệp",
      price: "Từ 500.000 VNĐ",
      features: ["Logo Design", "Banner", "Brochure", "Social Media Kit"],
      icon: "🎨",
    },
  ];

  const digitalProducts = [
    {
      id: 1,
      title: "Template Website",
      description: "Mẫu website có sẵn, dễ tùy chỉnh",
      price: "299.000 VNĐ",
      features: ["Responsive", "Easy Customize", "Documentation", "Support"],
      icon: "💻",
    },
    {
      id: 2,
      title: "Plugin WordPress",
      description: "Các plugin tối ưu cho WordPress",
      price: "199.000 VNĐ",
      features: ["Easy Install", "Regular Updates", "Documentation", "Support"],
      icon: "🔌",
    },
    {
      id: 3,
      title: "Stock Photos",
      description: "Thư viện ảnh chất lượng cao",
      price: "99.000 VNĐ/gói",
      features: [
        "High Resolution",
        "Commercial Use",
        "Various Categories",
        "Instant Download",
      ],
      icon: "📸",
    },
    {
      id: 4,
      title: "E-book & Courses",
      description: "Sách điện tử và khóa học online",
      price: "Từ 149.000 VNĐ",
      features: [
        "PDF Format",
        "Video Lessons",
        "Lifetime Access",
        "Certificate",
      ],
      icon: "📚",
    },
  ];

  return (
    <div className="services-page">
      <section className="services-overview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Dịch Vụ Của Chúng Tôi</h2>
            <p className="section-subtitle">
              Từ ý tưởng đến thực hiện, chúng tôi đồng hành cùng bạn trong hành
              trình chuyển đổi số
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="service-title">Phát Triển Website</h3>
              <p className="service-description">
                Thiết kế và phát triển website chuyên nghiệp, responsive, tối ưu
                SEO và hiệu suất cao.
              </p>
              <ul className="service-features">
                <li>Website doanh nghiệp</li>
                <li>Website bán hàng</li>
                <li>Landing page</li>
                <li>Blog & Portfolio</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="3"
                    width="20"
                    height="14"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="8"
                    y1="21"
                    x2="16"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="service-title">Ứng Dụng Mobile</h3>
              <p className="service-description">
                Phát triển ứng dụng mobile đa nền tảng với giao diện thân thiện
                và trải nghiệm người dùng tuyệt vời.
              </p>
              <ul className="service-features">
                <li>App iOS & Android</li>
                <li>React Native</li>
                <li>Flutter</li>
                <li>PWA</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="service-title">Giải Pháp Phần Mềm</h3>
              <p className="service-description">
                Phát triển phần mềm quản lý, hệ thống ERP, CRM phù hợp với nhu
                cầu kinh doanh cụ thể.
              </p>
              <ul className="service-features">
                <li>Phần mềm quản lý</li>
                <li>Hệ thống ERP</li>
                <li>CRM</li>
                <li>Tích hợp API</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="service-title">Marketing Số</h3>
              <p className="service-description">
                Chiến lược marketing số toàn diện, SEO, SEM, social media
                marketing và content marketing.
              </p>
              <ul className="service-features">
                <li>SEO & SEM</li>
                <li>Social Media</li>
                <li>Email Marketing</li>
                <li>Content Marketing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Products */}
      <section className="digital-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sản Phẩm Số</h2>
            <p className="section-subtitle">
              Các sản phẩm số được thiết kế sẵn, giúp bạn tiết kiệm thời gian và
              chi phí
            </p>
          </div>

          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <div className="product-placeholder">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 15l-5-5L5 21"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Template Website</h3>
                <p className="product-description">
                  Bộ sưu tập template website chuyên nghiệp, dễ dàng tùy chỉnh
                  cho nhiều lĩnh vực kinh doanh khác nhau.
                </p>
                <div className="product-features">
                  <span className="feature-tag">Responsive</span>
                  <span className="feature-tag">SEO Ready</span>
                  <span className="feature-tag">Tùy chỉnh</span>
                </div>
                <div className="product-price">
                  <span className="price-label">Từ</span>
                  <span className="price-value">500.000₫</span>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <div className="product-placeholder">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 19c-5 0-8-3-8-8s3-8 8-8 8 3 8 8-3 8-8 8z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 9l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Plugin & Extension</h3>
                <p className="product-description">
                  Các plugin và extension tăng cường tính năng cho website, ứng
                  dụng với hiệu suất tối ưu.
                </p>
                <div className="product-features">
                  <span className="feature-tag">WordPress</span>
                  <span className="feature-tag">Shopify</span>
                  <span className="feature-tag">Magento</span>
                </div>
                <div className="product-price">
                  <span className="price-label">Từ</span>
                  <span className="price-value">200.000₫</span>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <div className="product-placeholder">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="2.18"
                      ry="2.18"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="7"
                      y1="2"
                      x2="7"
                      y2="22"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="17"
                      y1="2"
                      x2="17"
                      y2="22"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="2"
                      y1="12"
                      x2="22"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="2"
                      y1="7"
                      x2="7"
                      y2="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="2"
                      y1="17"
                      x2="7"
                      y2="17"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="17"
                      y1="17"
                      x2="22"
                      y2="17"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="17"
                      y1="7"
                      x2="22"
                      y2="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">UI/UX Kit</h3>
                <p className="product-description">
                  Bộ kit UI/UX components hoàn chỉnh, giúp thiết kế giao diện
                  chuyên nghiệp và nhất quán.
                </p>
                <div className="product-features">
                  <span className="feature-tag">Figma</span>
                  <span className="feature-tag">Sketch</span>
                  <span className="feature-tag">Adobe XD</span>
                </div>
                <div className="product-price">
                  <span className="price-label">Từ</span>
                  <span className="price-value">800.000₫</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Quy Trình Làm Việc</h2>
            <p className="section-subtitle">
              Quy trình chuyên nghiệp, minh bạch từ khâu tư vấn đến bàn giao
            </p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3 className="step-title">Tư Vấn & Phân Tích</h3>
                <p className="step-description">
                  Lắng nghe, phân tích nhu cầu và đưa ra giải pháp phù hợp nhất
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3 className="step-title">Thiết Kế & Lên Kế Hoạch</h3>
                <p className="step-description">
                  Thiết kế mockup, wireframe và lập kế hoạch triển khai chi tiết
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3 className="step-title">Phát Triển & Kiểm Thử</h3>
                <p className="step-description">
                  Phát triển sản phẩm theo tiêu chuẩn cao và kiểm thử kỹ lưỡng
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3 className="step-title">Bàn Giao & Hỗ Trợ</h3>
                <p className="step-description">
                  Bàn giao sản phẩm và hỗ trợ vận hành, bảo trì dài hạn
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tại Sao Chọn Chúng Tôi?</h2>
            <p className="section-subtitle">
              Những lý do khiến khách hàng tin tưởng và lựa chọn dịch vụ của
              chúng tôi
            </p>
          </div>

          <div className="advantages-grid">
            <div className="advantage-item">
              <div className="advantage-icon">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="advantage-title">Chất Lượng Cao</h3>
              <p className="advantage-description">
                Sản phẩm được phát triển theo tiêu chuẩn quốc tế, đảm bảo chất
                lượng và hiệu suất tối ưu.
              </p>
            </div>

            <div className="advantage-item">
              <div className="advantage-icon">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="12,6 12,12 16,14"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="advantage-title">Giao Hàng Đúng Hạn</h3>
              <p className="advantage-description">
                Cam kết bàn giao dự án đúng thời hạn đã thỏa thuận, không để
                khách hàng phải chờ đợi.
              </p>
            </div>

            <div className="advantage-item">
              <div className="advantage-icon">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="advantage-title">Hỗ Trợ 24/7</h3>
              <p className="advantage-description">
                Đội ngũ hỗ trợ kỹ thuật sẵn sàng giải đáp mọi thắc mắc và xử lý
                sự cố nhanh chóng.
              </p>
            </div>

            <div className="advantage-item">
              <div className="advantage-icon">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="advantage-title">Bảo Mật Tuyệt Đối</h3>
              <p className="advantage-description">
                Cam kết bảo mật thông tin khách hàng và mã nguồn theo tiêu chuẩn
                bảo mật cao nhất.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
