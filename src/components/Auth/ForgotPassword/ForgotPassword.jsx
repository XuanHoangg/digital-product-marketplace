import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>D</span>
            <span className={styles.logoText}>DigitalMarket</span>
          </div>
          <h1 className={styles.title}>Quên Mật Khẩu</h1>
          <p className={styles.subtitle}>
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>
        </div>

        {!isSubmitted ? (
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.label}>Email</div>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>ⓘ</div>
              <div className={styles.infoText}>
                Chúng tôi sẽ gửi một email với liên kết đặt lại mật khẩu. Liên
                kết sẽ có hiệu lực sau 30 phút.
              </div>
            </div>

            <button
              className={styles.submitButton}
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Đang gửi..." : "Gửi Liên Kết Đặt Lại"}
            </button>

            <button className={styles.backButton} onClick={handleBackToLogin}>
              ← Quay lại trang đăng nhập
            </button>
          </div>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>
              Đã gửi liên kết đặt lại mật khẩu!
            </h2>
            <p className={styles.successText}>
              Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn.
            </p>
            <button className={styles.backButton} onClick={handleBackToLogin}>
              ← Quay lại trang đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
